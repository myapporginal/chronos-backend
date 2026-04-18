import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { PERMISSIONS_KEY } from '../decorators/require-permissions.decorator';
import { UnauthorizedException } from '@common/exceptions/unauthorized.exception';
import { ForbiddenException } from '@common/exceptions/forbidden.exception';

// Extends the User interface to include the companyId and role
export interface RequestWithUser extends Request {
  user: { sub: string; tenant_id: string; scopes: string[] };
  tenantId: string | null;
}

@Injectable()
export class TenantPermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    const request = context.switchToHttp().getRequest<RequestWithUser>();

    // 1. Authenticate user if not already authenticated
    let user = request.user;
    if (!user) {
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException(
          'Token de autenticación no ha sido encontrado, por favor inicie sesión.',
        );
      }

      try {
        user = await this.jwtService.verifyAsync(token);
        request.user = user; // Attach user to request
      } catch {
        throw new UnauthorizedException(
          'Token de autenticación inválido, por favor inicie sesión.',
        );
      }
    }

    // 2. Multitenancy validation
    const tenantId = user.tenant_id;
    if (!tenantId) {
      throw new ForbiddenException();
    }

    // Inject tenant context into request for downstream use
    request.tenantId = tenantId;

    // 3. Scope / Permission validation
    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true; // Route is protected for tenant users, but requires no specific permission
    }

    const userScopes = user.scopes || [];

    // Check if the user has all the required permissions
    const hasPermission = requiredPermissions.every((permission) =>
      userScopes.includes(permission),
    );

    if (!hasPermission) {
      throw new ForbiddenException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
