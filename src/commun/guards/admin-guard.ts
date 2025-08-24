import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

/**
 * Guard simples para permitir acesso APENAS a usuários com `role === 'admin'`.
 *
 * Pré-requisito: alguém no pipeline (ex.: AuthGuard/JWT strategy) precisa
 * preencher `request.user` — senão este guard vai negar o acesso.
 */
@Injectable() // Torna a classe injetável pelo Nest (DI), permitindo usá-la com @UseGuards
export class AdminGuard implements CanActivate {

  /**
   * Método exigido pela interface `CanActivate`.
   * Retorna `true` para permitir a execução do handler; `false` para bloquear.
   * Também pode retornar Promise/Observable para casos assíncronos.
   */
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {

    // Converte o contexto genérico para HTTP (Express/Fastify)
    const request = context.switchToHttp().getRequest();

    // Espera que algum AuthGuard tenha colocado `user` no request (ex.: via JWT)
    const role = request['user']?.role;

    // Permite acesso somente se o papel for 'admin'.
    // Se retornar `false`, o Nest lança automaticamente `ForbiddenException (403)`.
    return role === 'admin';
  }
}
