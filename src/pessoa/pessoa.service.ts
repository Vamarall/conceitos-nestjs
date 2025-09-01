import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pessoa } from './entities/pessoa.entity';
import { HashingService } from 'src/auth/hashing/hashing.service';

@Injectable()
export class PessoaService {

  constructor(
    @InjectRepository(Pessoa)
    private readonly repo: Repository<Pessoa>,
    private readonly hashingService: HashingService
  ) { }

  async create(createPessoaDto: CreatePessoaDto) {
    try {
      const passwordHash = await this.hashingService.hash(createPessoaDto.password)
      const pessoa = {
        ...createPessoaDto,
        createdAt: new Date(),
        passwordHash: passwordHash
      }

      const novaPessoa = this.repo.create()
      await this.repo.save(pessoa);
      return novaPessoa;
    } catch (error) {

      if (error.code === '23505') {
        throw new ConflictException('E-mail ja cadastrado')
      }

      throw error
    }
  }

  async findAll() {
    const pessoas = await this.repo.find();
    return pessoas;
  }

  async findOne(id: number) {
    const pessoa = await this.repo.findOne({
      where: { id: id }
    })

    if (pessoa) return pessoa;

    throw new NotFoundException(`Pessoa com ID ${id} não encontrado!`);
  }

  async update(id: number, updatePessoaDto: UpdatePessoaDto) {
    const pessoa = await this.repo.findOne({
      where: { id: id }
    })

    if (!pessoa) {
      throw new NotFoundException(`Pessoa com ID ${id} não encontrado!`);
    }
    this.repo.merge(pessoa, updatePessoaDto);
    return this.repo.save(pessoa);
  }

  async remove(id: number) {
    const pessoa = await this.repo.findOne({
      where: { id: id }
    })

    if (!pessoa) {
      throw new NotFoundException(`Pessoa com ID ${id} não encontrado!`);
    }

    return this.repo.remove(pessoa)

  }
}
