import { registerDecorator, ValidationOptions } from "class-validator";
import { IsUserConstraint } from "./is-user.constraint";

export function IsUser(validationOptions?: ValidationOptions) {
    return function (object: Object, property: string) {
        registerDecorator({
            name: 'isUser',
            target: object.constructor,
            propertyName: property,
            options: validationOptions,
            validator: IsUserConstraint,
            async: true,
        })
    }
}