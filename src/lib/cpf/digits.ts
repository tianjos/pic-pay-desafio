import { Digit } from "./digit"

export class Digits {
    private digits: Digit[]

    constructor(input: Digit[])
    constructor(input: string)
    constructor(input: any) {
        if (typeof input === 'string') {
            this.digits = input
                .replaceAll('.', '')
                .replace('-', '')
                .split('')
                .map((digit) => new Digit(digit))

            return
        }

        if (Array.isArray(input) && input.every((digit) => digit instanceof Digit)) {
            this.digits = input

            return
        }

        throw new Error('invalid digits')
    }

    asArray() {
        return this.digits
    }

    asLength() {
        return this.digits.length
    }

    asString() {
        return this.digits.map((digit) => digit.asNumber()).join('')
    }

    splitAt(index: number) {
        return new Digits(this.digits.slice(0, index))
    }

    allEquals() {
        return this.digits.every((digit) => digit.equalTo(this.digits[0]))
    }

    // asReverse() {
    //     return new Digits(this.digits.reverse())
    // }

    // mapTo(fn: (digit: Digit, index: number, array: Digit[]) => Digit[]) {
    //     return new Digits(this.digits.map(fn))
    // }
}