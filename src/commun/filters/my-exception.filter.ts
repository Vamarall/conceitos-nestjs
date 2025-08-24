import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";

/**
 * Filtro de exceções que captura **apenas** erros do tipo `HttpException`
 * (e subclasses) lançados no contexto HTTP do NestJS.
 *
 * - Use este filtro para padronizar o JSON de resposta de erros HTTP.
 * - Obs.: ele **não** pega erros vindos de middleware (Express/Fastify),
 *   apenas do pipeline do Nest (guards, pipes, interceptors, controllers/services).
 */
@Catch(HttpException) // Decorator que registra o filtro para HttpException
export class MyExceptionFilter<T extends HttpException> implements ExceptionFilter {
  /**
   * Método obrigatório da interface `ExceptionFilter`.
   * É chamado pelo Nest quando uma exceção do(s) tipo(s) declarado(s) em `@Catch(...)` é lançada.
   *
   * @param exception A exceção capturada (limitada a `HttpException` por causa do decorator).
   * @param host Wrapper que dá acesso ao contexto da requisição (HTTP, RPC, WS). Aqui usaremos HTTP.
   */
  catch(exception: T, host: ArgumentsHost) {
    // Converte o host genérico para o contexto HTTP (req/res do Express ou Fastify)
    const cntx = host.switchToHttp();

    // `response` e `request` são os objetos nativos (Express.Response / Express.Request)
    const response = cntx.getResponse();
    const request = cntx.getRequest();

    // Status HTTP (ex.: 400, 401, 403, 404, 500...) vindo da própria HttpException
    const statusCode = exception.getStatus();

    // Payload "cru" que pode ter sido passado ao lançar a HttpException
    // Pode ser string ("Not Found") ou um objeto (ex.: { message: '...', error: '...', statusCode: 400 })
    const exceptionResponse = exception.getResponse();

    // Normaliza o payload: se vier string, viramos { message: string }; se for objeto, mantemos como objeto
    const error =
      typeof exceptionResponse === "string"
        ? { message: exceptionResponse }
        : (exceptionResponse as object);

    // Resposta JSON padronizada enviada ao cliente
    response.status(statusCode).json({
      // espalha o conteúdo normalizado (pode conter message, error, statusCode, etc.)
      ...error,

      // Campos adicionais úteis para debug/tracing:
      // "data": timestamp ISO (dica: muitos projetos preferem o nome "timestamp")
      data: new Date().toISOString(),

      // "path": a URL da requisição que gerou o erro
      path: request.url,
    });
  }
}
