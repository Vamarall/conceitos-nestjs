import { Module } from '@nestjs/common';
import { RecadosController } from './recados.controller';
import { RecadoService } from './recados.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecadoEntity } from './entities/recado.entity';
import { PessoaModule } from 'src/pessoa/pessoa.module';


@Module({
  imports: [TypeOrmModule.forFeature([RecadoEntity]), PessoaModule],
  controllers: [RecadosController],
  providers: [RecadoService]
})
export class RecadosModule {}
