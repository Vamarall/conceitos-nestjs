import { Injectable } from '@nestjs/common';

@Injectable()
export class ConceitosAutomaticoService {

    home(): string {
        return 'conceitos-automatico'
    }
}
