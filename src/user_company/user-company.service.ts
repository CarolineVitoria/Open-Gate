import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCompany } from './entities/user_company.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/users/user.service';
import { FindUserByCpfDto } from 'src/users/dto/find-user-by-cpf-dto';

@Injectable()
export class UserCompanyService {
  constructor(
    @InjectRepository(UserCompany)
    private readonly userCompanyRepository: Repository<UserCompany>,
    private readonly userSevice: UserService,
  ) {}

  async registerUserInCompany(idCompany: string, registerUser: FindUserByCpfDto) {

    const user = await this.userSevice.readUser(registerUser);
    const registerData = {
      idCompany: idCompany,
      idUser: user.id,
      role: 'member'
    }

    const register = this.userCompanyRepository.create(
      {
        registerData
      }
    )
    this.userCompanyRepository.save(register);
  }
}
