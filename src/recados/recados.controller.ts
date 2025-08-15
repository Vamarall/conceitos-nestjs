import { Controller, Get } from '@nestjs/common';

@Controller('recados')
export class RecadosController {

    // Método para buscar todos os recados
    @Get()
    findAll() {
        return 'Esse metodo retorna todos os recados';
    }

     // Método para buscar um recado
     @Get(':id')
     findOne() {
         return 'Esse metodo retorna um recado';
     }
}
