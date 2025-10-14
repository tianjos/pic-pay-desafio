import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { CPF } from "src/lib/cpf";

@ValidatorConstraint({ name: 'IsCPF', async: false })
export class IsCPFConstraint implements ValidatorConstraintInterface {
    private errorMessage: string

    validate(value: any, validationArguments?: ValidationArguments): boolean {
        if (value === null || value === undefined) {
            return false
        }

        try {
            new CPF(value)
            return true
        } catch (error) {
            this.errorMessage = error.message
            return false
        }
    }

    defaultMessage?(validationArguments?: ValidationArguments): string {
        return validationArguments?.constraints[0] ?? this.errorMessage ?? 'CPF is invalid'
    }

}