import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCompany } from './entities/user_company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserCompanyService {
  constructor(
    @InjectRepository(UserCompany)
    private readonly userCompanyRepository: Repository<UserCompany>,
  ) {}

  async registerUserInCompany(idCompany: string) {
    //companhia pode registar um usuário nela
    //
    console.log('fds');
  }
}
