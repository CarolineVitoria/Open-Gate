import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { UserCompany } from './entities/user_company.entity';
import { UserCompanyController } from './user-company.controller';
import { UserCompanyService } from './user-company.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserCompany]),
    UsersModule, // <-- sempre dentro de `imports`
  ],
  controllers: [UserCompanyController],
  providers: [UserCompanyService],
})
export class UserCompanyModule {}
