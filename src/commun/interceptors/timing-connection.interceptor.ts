import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

export class TimingConnectionInterceptor implements NestInterceptor {
    async intercept(context: ExecutionContext, next: CallHandler<any>) {
        const startTime = Date.now();
        console.log('TimingConnectionInterceptor executado ANTES')

        return next.handle().pipe(
            tap(() => {
                const finalTime = Date.now();
                const elapsedTime = finalTime - startTime;
                console.log(`TimingConnectionInterceptor levou ${elapsedTime}ms para executar`)
            })
        )
    }

}