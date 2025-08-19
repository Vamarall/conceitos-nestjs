import { IsEmail } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
}
