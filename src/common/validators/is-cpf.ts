import { cpf } from 'cpf-cnpj-validator';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isCpfValid', async: false })
export class IsCpfValidConstraint implements ValidatorConstraintInterface {
  validate(value: string) {
    return cpf.isValid(value);
  }

  defaultMessage(args: ValidationArguments) {
    return 'CPF inválido';
  }
}
