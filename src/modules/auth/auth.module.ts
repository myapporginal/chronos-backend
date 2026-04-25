import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '@modules/access-control/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AppConfigService } from '@config/app.config';
import { CustomConfigModule } from '@config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@modules/access-control/users/user.entity';
import { Company } from '@modules/organization-structure/companies/companies.entity';
import { CompaniesModule } from '@modules/organization-structure/companies/companies.module';

@Module({
  imports: [
    UsersModule,
    CustomConfigModule,
    CompaniesModule,
    TypeOrmModule.forFeature([User, Company]),
    JwtModule.registerAsync({
      useFactory: (appConfigService: AppConfigService) => ({
        global: true,
        secret: appConfigService.jwtSecret(),
        signOptions: { expiresIn: parseInt(appConfigService.jwtExpiresIn()) },
      }),
      inject: [AppConfigService],
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
