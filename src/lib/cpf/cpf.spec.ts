import { CPF } from "./cpf"

describe('CPF', () => {
    it('should instatiate cpf successfully', () => {
        const cpf = new CPF('111.444.777-35')

        expect(cpf).toBeInstanceOf(CPF)
    })

    it('should fail with all equal digits', () => {
        expect(() => new CPF('111.111.111-11')).toThrow('invalid cpf')
    })
})