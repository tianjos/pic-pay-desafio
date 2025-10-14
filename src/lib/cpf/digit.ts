export class Digit {
    private value: number

    constructor(value: any) {
        if (isNaN(value)) {
            throw new Error("invalid digit")
        }

        this.value = Number(value)
    }

    valueOf() {
        return this.value
    }

    asNumber() {
        return this.value
    }

    subtract(digit: Digit) {
        return new Digit(this.value - digit.value)
    }

    plus(digit: Digit) {
        return new Digit(digit.value + this.value)
    }

    multiply(digit: Digit) {
        return new Digit(digit.value * this.value)
    }

    divide(digit: Digit): [dividend: Digit, remainder: Digit] {
        const dividend = new Digit(Math.trunc(this.value / digit.value))
        const remainder = new Digit(this.value % digit.value)
        return [dividend, remainder]
    }

    greaterThan(digit: Digit) {
        return this.value > digit.value
    }

    lessThan(digit: Digit) {
        return !this.greaterThan(digit)
    }

    equalTo(digit: Digit) {
        return this.value === digit.value
    }
}