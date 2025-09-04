import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { REQUEST_TOKEN_PAYLOAD_KEY } from "../auth-constants";

/**
 * TokenPayLoadParam
 * ----------------------------------------------------------------------------
 * Param Decorator para injetar, nos handlers dos Controllers, o *payload* do
 * token (ex.: JWT) que foi previamente anexado ao `request` por um Guard
 * ou Middleware usando a chave `REQUEST_TOKEN_PAYLOAD_KEY`.
 */

export const TokenPayLoadParam = createParamDecorator(
    (data: unknown, context: ExecutionContext) => {
        // Converte o ExecutionContext genérico para o contexto HTTP (Express/Fastify).
        const ctx = context.switchToHttp();
        // Recupera o objeto Request da implementação HTTP (aqui, Express).
        const request: Request = ctx.getRequest();

        // Retorna o payload anexado pelo Guard/Middleware na chave configurada.
        // O valor retornado aqui será injetado no parâmetro decorado do Controller.
        return request[REQUEST_TOKEN_PAYLOAD_KEY];

    }
)