import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty()
  name: string;
}
