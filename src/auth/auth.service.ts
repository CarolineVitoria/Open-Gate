import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async login() {
    return 'fazer SERVICE LOGIN';
  }
}
