import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CompanyModule } from './company/company.module';
import { UserCompanyModule } from './user_company/user_company.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    //forRoot configura a conexão com o banco
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      database: 'opengate',
      password: '1234',
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
export class AppModule {}
