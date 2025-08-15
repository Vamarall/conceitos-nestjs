import { Controller, Get, Param } from '@nestjs/common';
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
}
