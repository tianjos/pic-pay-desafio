import { Digit } from "./digit"

export class Calculator {
    constructor(private digits: Digit[]) { }

    multiply() {
        return new Calculator(this.digits.reverse().map((digit, index) => digit.multiply(new Digit(index + 2))))
    }

    sum() {
        return this.digits.reduce((prev, curr) => prev.plus(curr), new Digit(0))
    }
}