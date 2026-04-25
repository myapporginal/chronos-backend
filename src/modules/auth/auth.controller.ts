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
import { RegisterDto } from './dtos/register.dto';
import { Company } from '@modules/organization-structure/companies/companies.entity';
import { plainToInstance } from 'class-transformer';
import { User } from '@modules/access-control/users/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @PublicRoute()
  async login(@Body() { email, password }: LoginDto) {
    return await this.authService.signIn(email, password);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @PublicRoute()
  async register(@Body() registerDto: RegisterDto) {
    const company = plainToInstance(Company, registerDto.company, {
      ignoreDecorators: true,
    });
    const user = plainToInstance(User, registerDto.user, {
      ignoreDecorators: true,
    });

    return {
      detail: 'Usuario registrado correctamente.',
      data: await this.authService.register(company, user),
    };
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
