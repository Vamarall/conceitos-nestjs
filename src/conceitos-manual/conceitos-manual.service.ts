import { Injectable } from '@nestjs/common';

@Injectable()
export class ConceitosManualService {
  solucionaHome(): string {
    return 'Soluciona Home do conceito manual';
  }
}
