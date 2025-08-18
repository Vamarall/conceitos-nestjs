import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecadosModule } from 'src/recados/recados.module';
import { TypeOrmModule } from '@nestjs/typeorm';

// A partir daqui (imports: []), você pode importar outros módulos necessários para o seu aplicativo.
@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres', // Tipo de banco de dados
    host: 'localhost', // Endereço do servidor de banco de dados
    port: 5432, // Porta do servidor de banco de dados
    username: '', // Usuário do banco de dados
    database: 'postgres', // Nome do banco de dados
    password: '261217', // Senha do banco de dados
    autoLoadEntities: true, // Carrega automaticamente as entidades registradas
    synchronize: true, // Atenção: não usar em produção, pois pode apagar dados!
  }),

    RecadosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
