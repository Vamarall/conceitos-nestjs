import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { RecadoEntity } from "./entities/recado.entity";
import { CreateRecadoDto } from "./dto/create-recado.dto";
import { UpdateReacadoDto } from "./dto/update-recado.dto";

@Injectable()
export class RecadoService {
    private lastId = 0;
    private recados: RecadoEntity[] = [
        {
            id: '1',
            text: 'Recado 1',
            de: 'João',
            para: 'Maria',
            lido: false,
            data: new Date('2023-10-01T10:00:00Z'),
            createdAt: new Date('2023-10-01T09:00:00Z'),
            updatedAt: new Date('2023-10-01T09:30:00Z'),
        }
    ]
    // Método para buscar todos os recados
    findAll(pagination: any) {
        const { limit = 10, offset = 0 } = pagination;
        return this.recados;
    }

    // Método para buscar um recado
    findOne(id: string) {
        const recado = this.recados.find(recado => recado.id == id) || null;

        if (recado) return recado;

        throw new NotFoundException(`Recado com ID ${id} não encontrado!`);
    }

    create(recadoDto: CreateRecadoDto) {
        this.lastId++;
        const id = this.lastId.toString();
        const newRecado: RecadoEntity = {
            id,
            ...recadoDto,
            lido: false,
            data: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
        }
        this.recados.push(newRecado);
        return newRecado;
    }

    update(id: string, UpdateReacadoDto: UpdateReacadoDto) {
        const recado = this.findOne(id);
        if (!recado) {
            throw new NotFoundException(`Recado com ID ${id} não encontrado!`);
        } else {
            Object.assign(recado, UpdateReacadoDto);
        }

        return {
            ...recado,
            ...UpdateReacadoDto
        };
    }

    delete(id: string) {
        const recado = this.findOne(id);
        if (!recado) {
            throw new NotFoundException(`Recado com ID ${id} não encontrado!`);
        } else {
            this.recados.splice(this.recados.indexOf(recado), 1);
        }
        return recado;
    }
}