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
  Req,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { RecadoService } from './recados.service';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateReacadoDto } from './dto/update-recado.dto';
import { PaginationDto } from 'src/commun/dto/pagination.dto';
import { ParseIntIdPipe } from 'src/commun/pipes/parse-int-id.pipe';
import { AddHeaderInterceptor } from 'src/commun/interceptors/add-header.interceptor';
import { TimingConnectionInterceptor } from 'src/commun/interceptors/timing-connection.interceptor';
import { AuthTokenInterceptor } from 'src/commun/interceptors/auth-token.interceptor';
import { UrlParam } from 'src/commun/params/url-param.decorator';
import { AuthTokenGuard } from 'src/auth/guards/auth-token-guard';
import { TokenPayLoadParam } from 'src/auth/params/token-payload-params';
import { TokenPayloadDto } from 'src/auth/dto/token.payload.dto';

@UseInterceptors(AuthTokenInterceptor)
@Controller('recados')
export class RecadosController {
  // Método para buscar todos os recados

  constructor(private readonly service: RecadoService) { }
  @Get()
  @UseInterceptors(AddHeaderInterceptor)
  findAll(@Query() paginationDto: PaginationDto, @Req() req: Request, @UrlParam() url: string) {
    console.log('RecadosController: ', req['user'])
    console.log(url)
    const recados = this.service.findAll(paginationDto);
    return recados;
  }

  // Método para buscar um recado
  @Get(':id')
  @UseInterceptors(TimingConnectionInterceptor)
  findOne(@Param('id') id: number) {
    console.log('Recados findOne controller executado')
    return this.service.findOne(id);
  }

  @UseGuards(AuthTokenGuard)
  @Post()
  create(@Body() recadoDto: CreateRecadoDto, @TokenPayLoadParam() tokenPayload : TokenPayloadDto) {
    return this.service.create(recadoDto, tokenPayload);
  }

  @UseGuards(AuthTokenGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() recadoDto: UpdateReacadoDto, @TokenPayLoadParam() tokenPayload : TokenPayloadDto ) {
    return this.service.update(id, recadoDto, tokenPayload);
  }

  @UseGuards(AuthTokenGuard)
  @Delete(':id')
  delete(@Param('id') id: number, @TokenPayLoadParam() tokenPayload : TokenPayloadDto) {
    return this.service.delete(id, tokenPayload);
  }
}
