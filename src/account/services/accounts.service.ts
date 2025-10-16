import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MakeTransferDto } from "../dtos/make-transfer.dto";
import { Account } from "../repositories/account.entity";

@Injectable()
export class AccountsService {
    constructor(
        @InjectRepository(Account)
        private readonly accountsRepository: Repository<Account>
    ) { }

    private checkBalance(account: Account, value: number) {
        if (account.balance - value < 0) {
            throw new Error('insufficient balance')
        }
    }

    private checkAccountType(account: Account) {
        if (account.type === 'shopkeeper') {
            throw new Error('invalid operation')
        }
    }

    transfer(dto: MakeTransferDto) {
        this.checkBalance(dto.payer, dto.value)
        this.checkAccountType(dto.payer)

        dto.payer.balance -= dto.value
        dto.payee.balance += dto.value

        return this.accountsRepository.save(
            [dto.payer, dto.payee], { transaction: true }
        )
    }
}