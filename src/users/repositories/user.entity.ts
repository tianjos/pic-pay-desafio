import { Timestamp } from "src/common/repositories/timestamp";
import { Account } from "src/users/repositories/account.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User extends Timestamp {
    @PrimaryGeneratedColumn('identity')
    id: number

    @Column()
    name: string

    @Column({ unique: true, nullable: true, length: 11, type: 'varchar' })
    cpf: string | null

    @Column({ unique: true, nullable: true, length: 14, type: 'varchar' })
    cnpj: string | null

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @OneToOne(() => Account, { eager: true })
    @JoinColumn()
    account: Account
}