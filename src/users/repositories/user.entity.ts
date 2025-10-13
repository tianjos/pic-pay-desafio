import { Timestamp } from "src/common/repositories/timestamp.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity";

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

    @ManyToMany(() => Role)
    @JoinTable()
    roles: Role[]
}