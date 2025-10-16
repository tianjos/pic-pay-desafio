import { IsNumber, IsPositive } from "class-validator"
import { IsUser } from "src/common/validators/user.validator"

export class CreatePaymentDto {
    @IsNumber()
    @IsPositive()
    value: number

    @IsUser()
    payer: number

    @IsUser()
    payee: number
}

