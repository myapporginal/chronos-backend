import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { PublicRoute } from '@common/decorators/is-public-route.decorator';
import * as tenantPermissionsGuard from '@common/guards/tenant-permissions.guard';
import { ServicePayload } from '@common/interfaces/api-response.interface';
import { MeDto } from '@modules/access-control/users/dtos/me.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @PublicRoute()
  async login(@Body() { email, password }: LoginDto) {
    return await this.authService.signIn(email, password);
  }

  @Get('me')
  async me(
    @Request() req: tenantPermissionsGuard.RequestWithUser,
  ): Promise<ServicePayload<MeDto>> {
    return {
      detail: 'Usuario obtenido correctamente.',
      data: await this.authService.me(req.user.sub),
    };
  }
}
