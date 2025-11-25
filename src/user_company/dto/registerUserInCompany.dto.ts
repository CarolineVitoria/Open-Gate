import { IsNotEmpty } from "class-validator";

export class RegisterUserInCompanyDto{

    @IsNotEmpty()
    cpfUser: string
}