import { Module } from '@nestjs/common';
import { RecadosController } from './recados.controller';
import { RecadoService } from './recados.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecadoEntity } from './entities/recado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RecadoEntity])],
  controllers: [RecadosController],
  providers: [RecadoService]
})
export class RecadosModule {}
