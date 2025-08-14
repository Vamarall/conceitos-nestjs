import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConceitoManualModule } from 'src/conceitos-manual/conceito-manual.module';
import { ConceitosAutomaticoModule } from 'src/conceitos-automatico/conceitos-automatico.module';

// A partir daqui (imports: []), você pode importar outros módulos necessários para o seu aplicativo.
@Module({
  imports: [ConceitoManualModule, ConceitosAutomaticoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
