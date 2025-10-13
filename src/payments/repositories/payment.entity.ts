import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('payments')
export class Payment {
    @PrimaryGeneratedColumn('identity')
    id: number

    @Column()
    value: number

    @Column()
    payer: number

    @Column()
    payee: number
}