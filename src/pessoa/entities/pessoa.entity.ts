import { IsEmail } from "class-validator";
import { RecadoEntity } from "src/recados/entities/recado.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Pessoa {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    @IsEmail()
    email: string;

    @Column()
    nome: string;

    @Column({ length: 255 })
    passwordHash: string;

    @CreateDateColumn()
    CreatedAt?: Date

    @UpdateDateColumn()
    updatedAt?: Date;

    @OneToMany(() => RecadoEntity, recado => recado.de)
    recadosEnviados: RecadoEntity[];

    @OneToMany(() => RecadoEntity, recado => recado.para)
    recadosRecebidos: RecadoEntity[];
}
