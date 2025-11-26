import { Injectable } from '@nestjs/common';
@Injectable()
export abstract class HashingServiceProtocol {
  //contrato
  abstract hash(password: string): Promise<string>;
  abstract compare(password: string, passwordHash): Promise<boolean>;
}
