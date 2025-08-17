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

@Controller('recados')
export class RecadosController {
  // Método para buscar todos os recados

  constructor(private readonly service: RecadoService) {}
  @Get()
  findAll(@Query() pagination: any) {
    return this.service.findAll(pagination);
  }

  // Método para buscar um recado
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.service.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
