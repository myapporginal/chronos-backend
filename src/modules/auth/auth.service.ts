import { UsersService } from '@modules/access-control/users/users.service';
import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@common/exceptions/unauthorized.exception';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MeDto } from '@modules/access-control/users/dtos/me.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) throw new UnauthorizedException();

    const { password: hashedPassword, ...result } = user;
    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (!isMatch) throw new UnauthorizedException();

    const scopes =
      user.role?.rolePermissions
        ?.map((rp) => rp.permission?.name)
        .filter(Boolean) || [];

    const payload = {
      sub: result.email,
      tenant_id: result.companyId,
      scopes,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async me(email: string): Promise<MeDto> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) throw new UnauthorizedException();
    console.log(user.role?.rolePermissions);

    return plainToInstance(
      MeDto,
      {
        ...user,
        role: {
          id: user.role.id,
          name: user.role.name,
        },
        scopes:
          user.role?.rolePermissions
            ?.map((rp) => rp.permission?.name)
            .filter(Boolean) || [],
      },
      { excludeExtraneousValues: true, ignoreDecorators: true },
    );
  }
}
