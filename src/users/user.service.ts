import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { FindUserByCpfDto } from './dto/find-user-by-cpf-dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HashingServiceProtocol } from 'src/auth/hashing/hasing.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepositoy: Repository<User>,
    private readonly hashingService: HashingServiceProtocol,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const passwordHash: string = await this.hashingService.hash(
      createUserDto.password,
    );

    /*const parsingCreateUser = {
      name: createUserDto.name,
      email: createUserDto.email,
      passwordHa,
    }; */
    const user = this.userRepositoy.create({
      name: createUserDto.name,
      email: createUserDto.email,
      passwordHash: passwordHash,
      cpf: createUserDto.cpf,
      birth_date: createUserDto.birth_date,
    });
    return await this.userRepositoy.save(user);
  }

  async readUser(findUserByCpfDto: FindUserByCpfDto): Promise<User> {
    const user = await this.userRepositoy.findOneBy({
      cpf: findUserByCpfDto.cpf,
    });
    if (!user) {
      throw new NotFoundException(`Usuário não encontrado`);
    }
    return user;
  }
  async deleteUser(uuid: string) {
    const result = await this.userRepositoy.delete(uuid);

    if (result.affected === 0) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return { message: 'Usuário deletado com sucesso' };
  }
  async updateUser(uuid: string, updateUserDto: UpdateUserDto) {
    if (!uuid) throw new BadRequestException('ID do usuário é obrigatório');

    const userData = {
      name: updateUserDto?.name,
    };

    if (updateUserDto?.password) {
      const passwordHash = await this.hashingService.hash(
        updateUserDto.password,
      );
      userData['passwordHash'] = passwordHash;
    }

    const user = await this.userRepositoy.preload({
      id: uuid,
      ...userData,
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return await this.userRepositoy.save(user);
  }
  async findAll() {
    const users = await this.userRepositoy.find({
      order: {
        name: 'ASC',
      },
    });

    return users;
  }
}
