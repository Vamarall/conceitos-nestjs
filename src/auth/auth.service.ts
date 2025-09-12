import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Pessoa } from "src/pessoa/entities/pessoa.entity";
import { Repository } from "typeorm";
import { HashingService } from "./hashing/hashing.service";
import type { ConfigType } from "@nestjs/config";
import jwtConfig from "./config/jwt.config";
import { JwtService } from "@nestjs/jwt";
import { RefreshTokenDto } from "./dto/refresh-token.dto";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Pessoa)
        private readonly pessoaRepository: Repository<Pessoa>,
        private readonly hashingService: HashingService,
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
        private readonly jwtService: JwtService) { }

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
        if (!isPasswordValid || !pessoa) {
            throw new UnauthorizedException("Email ou senha inválidos");
        }

        // ✅ Autenticação bem-sucedida, crie e retorne os tokens
        return this.createTokens(pessoa);
    }


    async refreshTokens(refreshDto: RefreshTokenDto) {
        try {
            const { sub } = await this.jwtService.verifyAsync(
                refreshDto.refreshToken,
                this.jwtConfiguration
            );

            const pessoa = await this.pessoaRepository.findOneBy({ id: sub });

            if (!pessoa) {
                throw new Error('Pessoa encontrada')
            }

        } catch (e) {
            throw new UnauthorizedException(e.message);
        }

    }

    // Gera um JWT assinado
    private async generateAccessToken<T>(sub?: number, expiresIn?: number, payload?: T) {
        return await this.jwtService.signAsync(
            {
                sub,
                ...payload
            },
            {
                audience: this.jwtConfiguration.audience, // valida "aud"
                issuer: this.jwtConfiguration.issuer, // valida "iss"
                secret: this.jwtConfiguration.secret, // chave de assinatura
                expiresIn,
            }
        );
    }

    // Gera access e refresh tokens
    private async createTokens(pessoa: Pessoa) {

        const accessToken = await this.
            generateAccessToken<Partial<Pessoa>>(pessoa?.id, this.jwtConfiguration.jwtTtl, { email: pessoa?.email });

        const refreshToken = await this.
            generateAccessToken(pessoa.id, this.jwtConfiguration.jwtRefreshTtl);


        return {
            accessToken,
            refreshToken
        };

    }
}