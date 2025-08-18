import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { RecadoService } from './recados.service';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateReacadoDto } from './dto/update-recado.dto';

@Controller('recados')
export class RecadosController {
  // Método para buscar todos os recados

  constructor(private readonly service: RecadoService) {}
  @Get()
  findAll(@Query() pagination: any) {
    return this.service.findAll();
  }

  // Método para buscar um recado
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() recadoDto: CreateRecadoDto) {
    return this.service.create(recadoDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() recadoDto: UpdateReacadoDto) {
    return this.service.update(id, recadoDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.service.delete(id);
  }
}
