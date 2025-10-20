import { AccountType } from "src/users/enums/account-type.enum";
import { User } from "src/users/repositories/user.entity";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

export class UserSeeder implements Seeder {
    public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const repo = dataSource.getRepository(User)

        const r = await repo.save([
            {
                cpf: '34945798060',
                email: 'foo@bar.com.br',
                password: '12345678',
                name: 'Foo bar',
                account: {
                    balance: 100,
                    type: AccountType.Regular
                }
            },
            {
                cpf: '03209634033',
                email: 'fizzbuzz@bar.com.br',
                password: '12345678',
                name: 'Fizz buzz',
                account: {
                    balance: 100,
                    type: AccountType.Regular
                }
            },
        ])


    }
}