import { CPF } from "./cpf"

describe('CPF', () => {
    it('should instatiate cpf successfully', () => {
        const cpf = new CPF('111.444.777-35')

        expect(cpf).toBeInstanceOf(CPF)
    })
})