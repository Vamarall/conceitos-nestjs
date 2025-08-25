// Cliente (navegador) -> Servidor -> Middleware (request, response)
// -> NestJS (guards, interceptors, pipes)

import { NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";

/**
 * Middleware "cru" (nível Express) que roda ANTES do pipeline do Nest (guards, pipes, etc.).
 * Útil para logging básico, CORS, parse de headers e anexar metadados ao `req`.
 *
 * Obs.: Neste ponto, filtros de exceção do Nest NÃO capturam erros daqui.
 * Se você passar um erro para `next(err)`, quem trata é o stack do Express/Fastify.
 */
export class SimpleMiddlaware implements NestMiddleware {
  /**
   * Método obrigatório do `NestMiddleware`.
   * Recebe os objetos nativos `req`, `res` e a função `next` para encadear o próximo middleware.
   */
  use(req: Request, res: Response, next: (error?: any) => void) {
    console.log('SimpleMiddlaware: Ola'); // log simples (evite em prod; prefira Logger)

    // Lê o header de autorização (ex.: "Bearer <token>")
    const authorization = req.headers?.authorization;

    // Se houver o header, injeta um "user" de exemplo no request.
    // Isso permite que Guards posteriores (ex.: AdminGuard) leiam `req.user`.
    if (authorization) {
      req['user'] = {
        nome: 'Victor',
        sobrenome: 'Amaral',
        role: 'admin', // <- com 'user' seu AdminGuard vai bloquear; troque para 'admin' em testes
      };
    }

    // Chama o PRÓXIMO middleware (ou entra no pipeline do Nest se não houver outro).
    // Se você chamar `next(err)`, cai no error handler do framework HTTP (não nos filtros do Nest).
    next();
  }
}
