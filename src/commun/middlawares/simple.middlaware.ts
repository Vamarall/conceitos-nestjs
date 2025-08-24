// Cliente (navegador) -> Servidor -> Middlaware (request, response)
// -> NestJs (guards, interceptors, pipes)

import { NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";

export class SimpleMiddlaware implements NestMiddleware{
    use(req: Request, res: Response, next: (error?: any) => void) {
        console.log('SimpleMiddlaware: Ola')
        
        const authorization = req.headers?.authorization;

        if(authorization){
            req['user'] = {
                nome: 'Victor',
                sobrenome: 'Amaral',
                role: 'user'
            }
        };

        // Proximo Middlaware
        next();
    }
    
}