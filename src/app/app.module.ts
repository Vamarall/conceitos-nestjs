import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecadosModule } from 'src/recados/recados.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoaModule } from 'src/pessoa/pessoa.module';
import { SimpleMiddlaware } from 'src/commun/middlawares/simple.middlaware';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { MyExceptionFilter } from 'src/commun/filters/my-exception.filter';
import { AdminGuard } from 'src/commun/guards/admin-guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';

// A partir daqui (imports: []), você pode importar outros módulos necessários para o seu aplicativo.
@Module({
  imports: [ ConfigModule.forRoot({ isGlobal: true }), // carrega .env
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        type: 'postgres',
        host: cfg.get<string>('DB_HOST', '127.0.0.1'),
        port: cfg.get<number>('DB_PORT', 5433),
        username: cfg.get<string>('DB_USER', 'personal'),
        password: cfg.get<string>('DB_PASS'),
        database: cfg.get<string>('DB_NAME', 'personal_db'), // <- ESSENCIAL
        autoLoadEntities: true,
        synchronize: true,
        logging: false
      }),
    }),
    RecadosModule,
    PessoaModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_FILTER,
      useClass: MyExceptionFilter
    },
    {
      provide: APP_GUARD,
      useClass: AdminGuard
    }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SimpleMiddlaware).forRoutes({
      path: '*',
      method: RequestMethod.ALL

    });
  }


}
