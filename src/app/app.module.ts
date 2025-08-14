import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConceitoManualModule } from 'src/conceitos-manual/conceito-manual.module';

// A partir daqui (imports: []), você pode importar outros módulos necessários para o seu aplicativo.
@Module({
  imports: [ConceitoManualModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
