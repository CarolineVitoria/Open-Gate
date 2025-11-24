import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserCompany } from './entities/user_company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserCompany])],
})
export class UserCompanyModule {}
