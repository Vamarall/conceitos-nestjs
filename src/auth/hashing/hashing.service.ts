// Contrato para serviços de hash (permite trocar a implementação, ex.: bcrypt, argon2)
export abstract class HashingService {
    // Retorna o hash da senha (com salt, se aplicável)
    abstract hash(password: string): Promise<string>;
  
    // Verifica se a senha em texto corresponde ao hash armazenado
    abstract compare(password: string, hash: string): Promise<boolean>;
  }
  