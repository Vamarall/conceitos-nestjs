import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { AuthTokenGuard } from 'src/auth/guards/auth-token-guard';
import { TokenPayLoadParam } from 'src/auth/params/token-payload-params';
import { TokenPayloadDto } from 'src/auth/dto/token.payload.dto';


@Controller('pessoa')
export class PessoaController {
  constructor(private readonly pessoaService: PessoaService) { }

  @Post()
  create(@Body() createPessoaDto: CreatePessoaDto) {
    const pessoa = this.pessoaService.create(createPessoaDto);
  }

  @UseGuards(AuthTokenGuard)
  @Get()
  findAll() {
    return this.pessoaService.findAll();
  }

  @UseGuards(AuthTokenGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pessoaService.findOne(+id);
  }

  @UseGuards(AuthTokenGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePessoaDto: UpdatePessoaDto, @TokenPayLoadParam() tokenPayload : TokenPayloadDto) {
    return this.pessoaService.update(+id, updatePessoaDto, tokenPayload);
  }

  @UseGuards(AuthTokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @TokenPayLoadParam() tokenPayload : TokenPayloadDto) {
    return this.pessoaService.remove(+id, tokenPayload);
  }
}
