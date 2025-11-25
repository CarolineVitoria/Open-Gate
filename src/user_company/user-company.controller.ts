import { RegisterUserInCompanyDto } from "./dto/registerUserInCompany.dto";
import { UserCompanyService } from "./user-company.service";
import { Controller, Injectable, Post, Body, Param } from '@nestjs/common';


@Controller()
export class UserCompanyController{
    constructor(private readonly userCompanyService: UserCompanyService){};

    @Post('registerInCompany:id')
    async registerUserInCompany(@Param() id:string, @Body() registerUser:RegisterUserInCompanyDto){
        return await this.userCompanyService.registerUserInCompany(id, registerUser);
    }
}