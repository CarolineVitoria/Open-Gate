import {
  Controller,
  Param,
  Post,
  Body,
  Get,
  Delete,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { FindUserByCpfDto } from './dto/find-user-by-cpf-dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class userController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const resp = await this.userService.createUser(createUserDto);
    return resp;
  }
  @Post()
  async returnUserByCPF(@Body() findUserByCpfDto: FindUserByCpfDto) {
    const resp = await this.userService.readUser(findUserByCpfDto);
    console.log(resp);
    return resp;
  }
  @Delete(':id') //@Param('id', new ParseUUIDPipe()) uuid: string) valida se o parametro uuid é válido
  async deleteUser(@Param() id: string) {
    return this.userService.deleteUser(id);
  }
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUser: UpdateUserDto,
  ): Promise<User> {
    console.log(id);
    return await this.userService.updateUser(id, updateUser);
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }
}
