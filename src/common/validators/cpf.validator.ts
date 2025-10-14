import { registerDecorator, ValidationOptions } from "class-validator";
import { IsCPFConstraint } from "./is-cpf.constraint";

export function IsCPF(validationOptions?: ValidationOptions) {
    return function (object: Object, property: string) {
        registerDecorator({
            name: 'isCPF',
            target: object.constructor,
            propertyName: property,
            options: validationOptions,
            validator: IsCPFConstraint,
        })
    }
}