import { Account } from "../../users/repositories/account.entity"

export class MakeTransferDto {
    payer: Account
    payee: Account
    value: number

    constructor(payer: Account, payee: Account, value: number) {
        this.payer = payer
        this.payee = payee
        this.value = value
    }
}