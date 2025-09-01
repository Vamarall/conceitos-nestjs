import { HashingService } from "./hashing.service";
import * as bcrypt from 'bcrypt'      // Biblioteca para hash de senhas

// Implementação de HashingService usando bcrypt
export class BcryptService extends HashingService {

    // Gera um salt aleatório e retorna o hash da senha
    async hash(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(); // custo padrão (10) se não especificado
        return bcrypt.hash(password, salt);
    }

    // Compara senha em texto com o hash armazenado (true = coincide)
    compare(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}
