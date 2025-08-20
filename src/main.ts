import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { ParseIntIdPipe } from './commun/pipes/parse-int-id.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Remove chaves que nao estao no DTO
    forbidNonWhitelisted: true, // Retorna erro se chaves nao estao no DTO
  }),
  new ParseIntIdPipe()
);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
