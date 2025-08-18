import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { RecadoEntity } from "./entities/recado.entity";
import { CreateRecadoDto } from "./dto/create-recado.dto";
import { UpdateReacadoDto } from "./dto/update-recado.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class RecadoService {
    constructor(
        @InjectRepository(RecadoEntity) // Injeta o repositório da entidade RecadoEntity
        private readonly recadoRepository: Repository<RecadoEntity> // Repositório para interagir com a entidade RecadoEntity
    ) { }
    // Método para buscar todos os recados
    async findAll() {
        const recados = await this.recadoRepository.find();
        return recados;
    }

    // Método para buscar um recado
    async findOne(id: number) {
        const recado = await this.recadoRepository.findOne({
            where: { id: id }
        })
        if (recado) return recado;

        throw new NotFoundException(`Recado com ID ${id} não encontrado!`);
    }

    async create(recadoDto: CreateRecadoDto) {

        const newRecado = {
            ...recadoDto,
            lido: false,
            data: new Date(),
        }
        const recado = await this.recadoRepository.create(newRecado);
        return this.recadoRepository.save(recado)
    }

    async update(idParam: number | string, dto: UpdateReacadoDto) {
        const id = Number(idParam);
        if (!Number.isInteger(id)) throw new BadRequestException('ID inválido');
      
        const recado = await this.recadoRepository.findOne({ where: { id } });
        if (!recado) throw new NotFoundException(`Recado com ID ${id} não encontrado!`);
      
        this.recadoRepository.merge(recado, dto);
        return this.recadoRepository.save(recado);
      }
      
      

    async delete(id: number) {
        const recado = await this.recadoRepository.findOne({
            where: { id: id }
        })
        if (!recado) {
            throw new NotFoundException(`Recado com ID ${id} não encontrado!`);
        }
        return this.recadoRepository.remove(recado);
    }
}