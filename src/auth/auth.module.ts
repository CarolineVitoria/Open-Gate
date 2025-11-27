import { Global, Module } from '@nestjs/common';
import { HashingServiceProtocol } from './hashing/hasing.service';
import { BcryptService } from './hashing/bcrypt.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from 'src/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { UserCompany } from 'src/user_company/entities/user_company.entity';

@Global() //pode ser usado na aplicação inteira
@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserCompany]),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: HashingServiceProtocol, //opencodeprinciple
      useClass: BcryptService,
    },
    AuthService,
  ],
  exports: [HashingServiceProtocol], // para q os outros nódulo possam ver oq está encapsulado aqui.
})
export class AuthModule {}
