import { Calculator } from "./calculator";
import { Digits } from "./digits";
import { Verifier } from "./verifier";

export class CPF {
    readonly digits: Digits

    constructor(input: string) {
        const digits = new Digits(input)

        if (digits.asLength() !== 11) {
            throw new Error('invalid cpf length')
        }

        if (digits.allEquals()) {
            throw new Error('invalid cpf')
        }

        const firstVerifier = new Verifier(new Calculator(digits.splitAt(9).asArray())).generate()
        const lastVerifier = new Verifier(new Calculator([...digits.splitAt(9).asArray(), firstVerifier])).generate()

        if (!firstVerifier.equalTo(digits.asArray().at(-2)!)) {
            throw new Error('invalid cpf')
        }

        if (!lastVerifier.equalTo(digits.asArray().at(-1)!)) {
            throw new Error('invalid cpf')
        }

        this.digits = digits
    }

    asFormatted() {
        return this.digits.asString().replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    }
}