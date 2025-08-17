import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { RecadoEntity } from "./entities/recado.entity";

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

    create(body: any) {
        this.lastId++;
        const id = this.lastId;
        const newRecado = {
            id,
            ...body
        }
        this.recados.push(newRecado);
        return newRecado;
    }

    update(id: string, body: any) {
        const recado = this.findOne(id);
        if (!recado) {
            throw new NotFoundException(`Recado com ID ${id} não encontrado!`);
        } else {
            Object.assign(recado, body);
        }

        return {
            ...recado,
            ...body
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