import { Pessoa } from "src/pessoa/entities/pessoa.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('recados')
export class RecadoEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: 'varchar', length: 255 })
    text: string;

    // Muitos recados podem ser enviados por uma pessoa
    @ManyToOne(() => Pessoa)
    // Especifica a coluna 'de' que armazena o ID da pessoa que enviou o recado
    @JoinColumn({ name: 'de' })
    de: Pessoa;
    // Muitos recados podem ser enviados por uma pessoa
    @ManyToOne(() => Pessoa)
    // Especifica a coluna 'para' que armazena o ID da pessoa que recebeu o recado
    @JoinColumn({ name: 'para' })
    para: Pessoa;
    @Column({ type: 'boolean', default: false })
    lido: boolean;
    @Column()
    data: Date;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}