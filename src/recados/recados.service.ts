import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { RecadoEntity } from "./entities/recado.entity";
import { CreateRecadoDto } from "./dto/create-recado.dto";
import { UpdateReacadoDto } from "./dto/update-recado.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PessoaService } from "src/pessoa/pessoa.service";
import { PaginationDto } from "src/commun/dto/pagination.dto";

@Injectable()
export class RecadoService {
    constructor(
        @InjectRepository(RecadoEntity) // Injeta o repositório da entidade RecadoEntity
        private readonly recadoRepository: Repository<RecadoEntity>,// Repositório para interagir com a entidade RecadoEntity
        private readonly pessoaService: PessoaService
    ) { }
    // Método para buscar todos os recados
    async findAll(paginationDto?: PaginationDto) {
        const { limit = 10, offset = 1 } = paginationDto || {};
        const recados = await this.recadoRepository.find({
            take: limit, // quantos registros vao ser exibidos (por pagina)
            skip: offset, // quantos registros devem ser pulados
            relations: ['de', 'para'],
            select: {
                de: {
                    nome: true,
                    id: true
                },
                para: {
                    nome: true,
                    id: true
                }
            }

        });
        return recados;
    }

    // Método para buscar um recado
    async findOne(id: number) {
        const recado = await this.recadoRepository.findOne({
            where: { id: id },
            relations: ['de', 'para'],
            select: {
                de: {
                    id: true,
                    nome: true
                },
                para: {
                    id: true,
                    nome: true
                }
            }
        })
        if (recado) return recado;

        throw new NotFoundException(`Recado com ID ${id} não encontrado!`);
    }

    async create(recadoDto: CreateRecadoDto) {
        const { deId, paraId } = recadoDto;

        // Encontrar a pessoa que esta mandando o recado
        const de = await this.pessoaService.findOne(deId)
        // Encontrar a pessoa que esta recebendo o recado
        const para = await this.pessoaService.findOne(paraId)

        const novoRecado = {
            text: recadoDto.text,
            de,
            para,
            lido: false,
            data: new Date(),
        }
        const recado = await this.recadoRepository.create(novoRecado);
        await this.recadoRepository.save(recado)
        return {
            ...novoRecado,
            de: {

                id: recado.de.id,
            },
            para: {
                id: recado.para.id
            }
        };
    }

    async update(idParam: number, dto: UpdateReacadoDto) {
        const recado = await this.findOne(idParam);

        recado.text = dto?.text ?? recado.text
        recado.lido = dto?.lido ?? recado.lido

        this.recadoRepository.merge(recado, dto);
        await this.recadoRepository.save(recado);
        return recado
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