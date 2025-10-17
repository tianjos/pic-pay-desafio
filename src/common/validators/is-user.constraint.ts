import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UsersService } from "src/users/services/user.service";

@ValidatorConstraint({ name: 'isUser', async: true })
@Injectable()
export class IsUserConstraint implements ValidatorConstraintInterface {
    constructor(private readonly usersService: UsersService) { }

    validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean {
        if (!value) return false
        if (isNaN(value)) return false

        return this.usersService.existsById(value)
    }
    defaultMessage?(validationArguments?: ValidationArguments): string {
        return `user ${validationArguments?.value} does not exist`
    }

}