import { Injectable } from "@nestjs/common";
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
        return this.recados.find(recado => recado.id == id) || null;
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
            return null;
        }else{
            Object.assign(recado, body);
        }

        return {
            ...recado,
            ...body
        };
    }

    delete(id: string) {
        const recado = this.findOne(id);
        if (recado) {
            this.recados.splice(this.recados.indexOf(recado), 1);
        }
        return {
            message: `Recado ${id} excluído com sucesso!`
        };
    }
}