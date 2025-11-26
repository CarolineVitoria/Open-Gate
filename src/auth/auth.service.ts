import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './hashing/dto/login.dto';
import { HashingServiceProtocol } from './hashing/hasing.service';
import jwtConfig from 'src/config/jwt.config';
import type { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(HashingServiceProtocol)
    private readonly hashingService: HashingServiceProtocol,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly jwtService: JwtService,
  ) {}

  async login(LoginDto: LoginDto) {
    console.log('HASHING SERVICE:', this.hashingService);
    console.log('TTL:', this.jwtConfiguration.jxTtl);
    console.log('SECRET:', this.jwtConfiguration.secret);
    console.log('ISSUER:', this.jwtConfiguration.issuer);
    console.log('AUD:', this.jwtConfiguration.audience);

    let passwordIsValid = false;
    const user = await this.userRepository.findOneBy({
      email: LoginDto.email,
    });

    if (!user) {
      throw new UnauthorizedException('é preciso informar email e senha');
    } else {
      passwordIsValid = await this.hashingService.compare(
        LoginDto.password,
        user.passwordHash,
      );
    }
    if (!passwordIsValid) {
      throw new UnauthorizedException('Usuário ou senha inválido');
    }

    const accessToken = await this.jwtService.signAsync(
      {
        id: user.id,
        name: user.name,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.jxTtl,
      },
    );

    return {
      accessToken,
    };
  }
}
