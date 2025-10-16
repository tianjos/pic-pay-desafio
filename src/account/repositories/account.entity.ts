import { Timestamp } from "src/common/repositories/timestamp.entity";
import { User } from "src/users/repositories/user.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('accounts')
export class Account extends Timestamp {
    @PrimaryGeneratedColumn('identity')
    id: number

    @Column()
    balance: number

    @Column()
    type: "regular" | 'shopkeeper'

    @OneToOne(() => User, (user) => user.account)
    user: User
}