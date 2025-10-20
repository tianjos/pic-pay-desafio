import { AccountType } from "src/users/enums/account-type.enum";
import { Account } from "src/users/repositories/account.entity";
import { User } from "src/users/repositories/user.entity";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

export class AccountSeeder implements Seeder {

    public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const userRepo = dataSource.getRepository(User)
        const accountRepo = dataSource.getRepository(Account)

        const users = await userRepo.find();

        if (!users.length) {
            throw new Error('No users found. Run UserSeeder first')
        }

        await Promise.all(users.map(
            (user) => accountRepo.insert({ balance: 500, type: AccountType.Regular, user: user })
        ))
    }

}