import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CompanyModule } from './company/company.module';
import { UserCompanyModule } from './user_company/user_company.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
console.log(process.env.DBHOST);
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    //forRoot configura a conexão com o banco
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DBHOST,
      port: 5432,
      username: process.env.DBUSER,
      database: process.env.DB,
      password: process.env.DBPASSWORD,
      autoLoadEntities: true, // carrega entidades sem precisar especirficá-las
      synchronize: true, // Sincroniza com o BD. Não deve ser usado em produção. Usar só pra criar as tabelas por código msm, dps deiza false.
    }),
    UsersModule,
    CompanyModule,
    UserCompanyModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    console.log('DBHOST:', process.env.DBHOST);
    console.log('DBUSER:', process.env.DBUSER);
  }
}
