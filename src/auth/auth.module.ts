import { Global, Module } from "@nestjs/common";
import { HashingService } from "./hashing/hashing.service";
import { BcryptService } from "./hashing/bcrypt.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Pessoa } from "src/pessoa/entities/pessoa.entity";
import { ConfigModule } from "@nestjs/config";
import jwtConfig from "./config/jwt.config";
import { JwtModule, JwtService } from "@nestjs/jwt";

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([Pessoa]),          // disponibiliza o repositório de Pessoa
        ConfigModule.forFeature(jwtConfig),          // registra as configs "jwt" (injeta via jwtConfig.KEY)
        JwtModule.registerAsync(jwtConfig.asProvider()), // ⚠ usa a config no JwtModule de forma abreviada;
    ],
    controllers: [AuthController],
    providers: [
        {
            provide: HashingService,
            useClass: BcryptService
        },
        AuthService
    ],
    exports: [
        HashingService,
        JwtModule,
        ConfigModule
    ]
})
export class AuthModule { }