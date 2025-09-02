import { Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Pessoa } from "src/pessoa/entities/pessoa.entity";
import { Repository } from "typeorm";
import { HashingService } from "./hashing/hashing.service";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Pessoa)
        private readonly pessoaRepository: Repository<Pessoa>,
        private readonly hashingService: HashingService) { }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto; // ⬅ facilita leitura e evita repetir "loginDto"

        // 🔐 IMPORTANTE:
        // Se no entity o passwordHash estiver com `select: false`, você PRECISA selecioná-lo explicitamente.
        // Ajuste os campos conforme seu entity (ex.: adicione 'nome' se existir).
        const pessoa = await this.pessoaRepository.findOne({
          where: { email },
          select: ["id", "email", "passwordHash"], // adicione "nome" etc. se quiser retornar
        });
        
    
        // ⚠️ NÃO redeclare variáveis! No seu código original, havia um "let isPasswordValid" dentro do if,
        // que SOMBRA a variável externa e a deixa sempre false.
        // Aqui fazemos a comparação numa única variável, sem shadowing.
        const isPasswordValid = pessoa
          ? await this.hashingService.compare(password, pessoa.passwordHash) // compare em tempo constante
          : false;
    
        // ❌ Não revele se foi email ou senha que falhou (evita enumeração de usuários)
        if (!isPasswordValid) {
          throw new UnauthorizedException("Email ou senha inválidos");
        }
    
        // ✅ NUNCA retorne o DTO original (ele contém a senha em claro).
        // Retorne dados sanitizados ou gere tokens (JWT / refresh) aqui.
        return {
          email: pessoa?.email,
        };
      }

}