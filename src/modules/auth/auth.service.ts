import { UsersService } from '@modules/access-control/users/users.service';
import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@common/exceptions/unauthorized.exception';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

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
}
