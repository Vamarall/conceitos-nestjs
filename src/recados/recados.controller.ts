import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { log } from 'console';

@Controller('recados')
export class RecadosController {

    // Método para buscar todos os recados
    @Get()
    findAll(@Query() pagination : any) {
        const {limit = 10 , offset = 0} = pagination;
        return `Esse metodo retorna todos os recados. limite=${limit} e offset=${offset}`;
    }

    // Método para buscar um recado
    @Get(':id')
    findOne(@Param('id') id: string) {
        return `Esse metodo retorna o recado com id ${id}`;
    }

    @Post()
    create(@Body() body: any) {
        return body;
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body: any) {

        return {
            id,
            ...body
        }
    }

    @Delete(':id')
    delete(@Param('id') id : string){
        return `Esse metodo deleta o recado com id ${id}`;
    }
}
