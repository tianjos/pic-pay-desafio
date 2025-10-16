import { Calculator } from "./calculator";
import { CPF_LENGTH } from "./constants";
import { Digit } from "./digit";

export class Verifier {
    constructor(private calculator: Calculator) { }

    generate() {
        const sum = this.calculator.multiply().sum()
        const [_, remainder] = sum.divide(new Digit(CPF_LENGTH))

        if (remainder.greaterThan(new Digit(2)) || remainder.equalTo(new Digit(2))) {
            return new Digit(CPF_LENGTH).subtract(remainder)
        }

        return new Digit(0)
    }
}