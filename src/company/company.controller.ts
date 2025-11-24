import { Controller, Injectable, Post, Body } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CompanyService } from './company.service';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  async createCompany(@Body() createCompanyDto: CreateCompanyDto) {
    const resp = await this.companyService.createCompany(createCompanyDto);
    return resp;
  }
}
