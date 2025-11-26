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
    private readonly userService: UserService,
  ) {}

  async registerUserInCompany(
    idCompany: string,
    registerUser: FindUserByCpfDto,
  ): Promise<UserCompany> {
    const user = await this.userService.readUser(registerUser);

    const register = this.userCompanyRepository.create({
      user: user,
      company: { id: idCompany },
      role: 'member',
    });
    await this.userCompanyRepository.save(register);

    return register;
  }
}
