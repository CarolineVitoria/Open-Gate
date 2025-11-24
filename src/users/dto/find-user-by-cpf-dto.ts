import { IsNotEmpty, Validate } from 'class-validator';
import { Transform } from 'class-transformer';
import { IsCpfValidConstraint } from 'src/common/validators/is-cpf';
export class FindUserByCpfDto {
  @Transform(({ value }) => {
    if (value === null || value === undefined) return value;
    const str = String(value);
    return str.replace(/\D/g, '');
  })
  @IsNotEmpty()
  @Validate(IsCpfValidConstraint)
  cpf: string;
}
