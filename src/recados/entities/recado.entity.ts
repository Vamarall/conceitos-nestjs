import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('recados')
export class RecadoEntity {
    @PrimaryGeneratedColumn()
    id: string;
    @Column({ type: 'varchar', length: 255 })
    text: string;
    @Column({ type: 'varchar', length: 255 })
    de: string;
    @Column({ type: 'varchar', length: 255 })
    para: string;
    @Column({ type: 'boolean', default: false })
    lido: boolean;
    @Column()
    data: Date;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}