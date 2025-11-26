import { FindUserByCpfDto } from 'src/users/dto/find-user-by-cpf-dto';
import { RegisterUserInCompanyDto } from './dto/registerUserInCompany.dto';
import { UserCompanyService } from './user-company.service';
import { Controller, Injectable, Post, Body, Param } from '@nestjs/common';

@Controller()
export class UserCompanyController {
  constructor(private readonly userCompanyService: UserCompanyService) {}

  @Post('registerInCompany/:id')
  async registerUserInCompany(
    @Param('id') id: string,

    @Body() registerUser: FindUserByCpfDto,
  ) {
    return await this.userCompanyService.registerUserInCompany(
      id,
      registerUser,
    );
  }
}
