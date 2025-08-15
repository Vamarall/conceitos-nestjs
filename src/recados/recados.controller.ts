import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { log } from 'console';

@Controller('recados')
export class RecadosController {

    // Método para buscar todos os recados
    @Get()
    findAll() {
        return 'Esse metodo retorna todos os recados';
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
