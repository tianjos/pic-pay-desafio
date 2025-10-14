import { Calculator } from "./calculator";
import { Digit } from "./digit";

export class Verifier {
    private DEFAULT_LENGTH = 11

    constructor(private calculator: Calculator) { }

    generate() {
        const sum = this.calculator.multiply().sum()
        const [_, remainder] = sum.divide(new Digit(this.DEFAULT_LENGTH))

        if (remainder.greaterThan(new Digit(2)) || remainder.equalTo(new Digit(2))) {
            return new Digit(this.DEFAULT_LENGTH).subtract(remainder)
        }

        return new Digit(0)
    }
}