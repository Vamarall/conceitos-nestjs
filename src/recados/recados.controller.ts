import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { RecadoService } from './recados.service';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateReacadoDto } from './dto/update-recado.dto';
import { PaginationDto } from 'src/commun/dto/pagination.dto';
import { ParseIntIdPipe } from 'src/commun/pipes/parse-int-id.pipe';
import { AddHeaderInterceptor } from 'src/commun/interceptors/add-header.interceptor';

@Controller('recados')
export class RecadosController {
  // Método para buscar todos os recados

  constructor(private readonly service: RecadoService) {}
  @Get()
  @UseInterceptors(AddHeaderInterceptor)
  findAll(@Query() paginationDto: PaginationDto) {
    const recados = this.service.findAll(paginationDto);
    return recados;
  }

  // Método para buscar um recado
  @Get(':id')
  findOne(@Param('id') id: number) {
    console.log(id, typeof id)
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
