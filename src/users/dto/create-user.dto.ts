import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Validate, IsStrongPassword } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { IsCpfValidConstraint } from 'src/common/validators/is-cpf';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword({ minLength: 6 })
  password: string;

  @IsNotEmpty({ message: 'Data de nascimento é obrigatória' })
  @Type(() => Date)
  birth_date: Date;

  @Validate(IsCpfValidConstraint)
  @Transform(({ value }) => {
    if (value === null || value === undefined) return value;
    const str = String(value);
    return str.replace(/\D/g, '');
  })
  @IsNotEmpty({ message: 'CPF é obrigatório' })
  cpf: string;
}
