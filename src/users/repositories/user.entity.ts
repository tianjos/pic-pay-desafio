import { Account } from "src/account/repositories/account.entity";
import { Timestamp } from "src/common/repositories/timestamp.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User extends Timestamp {
    @PrimaryGeneratedColumn('identity')
    id: number

    @Column()
    name: string

    @Column({ unique: true, nullable: true })
    cpf: string | null

    @Column({ unique: true, nullable: true })
    cnpj: string | null

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @OneToOne(() => Account, { eager: true })
    @JoinColumn()
    account: Account
}