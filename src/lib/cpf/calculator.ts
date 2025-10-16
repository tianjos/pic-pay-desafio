import { Digit } from "./digit"
import { Digits } from "./digits"

export class Calculator {
    constructor(private digits: Digits) { }

    multiply() {
        const digits = this.digits
            .reverse()
            .asArray()
            .map((digit, index) => digit.multiply(new Digit(index + 2)))

        return new Calculator(new Digits(digits))
    }

    sum() {
        return this.digits.asArray().reduce((prev, curr) => prev.plus(curr))
    }
}