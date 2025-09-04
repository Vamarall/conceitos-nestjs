import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import jwtConfig from "../config/jwt.config";
import type { ConfigType } from '@nestjs/config';
import { REQUEST_TOKEN_PAYLOAD_KEY } from "../auth-constants";

/**
 * Guard responsável por validar o token JWT em requisições HTTP.
 * - É aplicado por rota, controller ou globalmente (via app.useGlobalGuards).
 * - Caso o token seja inválido/ausente, lança UnauthorizedException (401).
 */
@Injectable()
export class AuthTokenGuard implements CanActivate {

    /**
     * Injeta o JwtService (para verificar assinar/verificar tokens)
     * e as configurações do JWT definidas no arquivo jwt.config.
     *
     * Obs.: ConfigType<typeof jwtConfig> garante tipagem forte do objeto de config.
     */
    constructor(
        private readonly jwtService: JwtService,
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    ) { }

    /**
     * Método principal do guard. É chamado antes do handler da rota.
     * Deve retornar true para permitir o acesso, ou lançar exceção para bloquear.
     */
    async canActivate(context: ExecutionContext): Promise<boolean> {
        // Obtém o objeto Request (apenas para contexto HTTP)
        const request = context.switchToHttp().getRequest<Request>();

        // Extrai o token do header Authorization (formato esperado: "Bearer <token>")
        const token = this.extractTokenFromHeader(request);

        // Se não houver token, rejeita imediatamente com 401
        if (!token) {
            throw new UnauthorizedException('Usuario nao logado!');
        }

        try {
            /**
             * Verifica e decodifica o token.
             * - this.jwtConfiguration deve conter, pelo menos, `secret`
             *   e, opcionalmente, `issuer`, `audience`, etc.
             * - verifyAsync lança erro se o token for inválido/expirado/etc.
             */
            const payload = await this.jwtService.verifyAsync(token, this.jwtConfiguration);

            request[REQUEST_TOKEN_PAYLOAD_KEY] = payload;


        } catch (error) {
            // Qualquer falha na verificação (expirado, assinatura inválida, etc.) cai aqui.
            console.log(error.message);
            throw new UnauthorizedException("Falha ao logar!");
        }

        // Se chegou até aqui, o token é válido e o acesso é permitido.
        return true;
    }

    /**
     * Extrai o token do cabeçalho Authorization.
     * Espera um header como: "Authorization: Bearer <token>".
     * Retorna o token (string) ou undefined se não estiver presente/formatado.
     */
    extractTokenFromHeader(request: Request): string | undefined {
        const authorization = request.headers?.authorization;

        // Garante que o header existe e é uma string
        if (!authorization || typeof authorization !== 'string') {
            return;
        }

        // Divide por espaço e pega a segunda parte, o próprio token
        return authorization.split(" ")[1];
    }
}
