import { Global, Module } from '@nestjs/common';
import { HashingServiceProtocol } from './hashing/hasing.service';
import { BcryptService } from './hashing/bcrypt.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Global() //pode ser usado na aplicação inteira
@Module({
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
