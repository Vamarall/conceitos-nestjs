import { Module } from '@nestjs/common';
import { RecadosController } from './recados.controller';
import { RecadoService } from './recados.service';

@Module({
  controllers: [RecadosController],
  providers: [RecadoService]
})
export class RecadosModule {}
