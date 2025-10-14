import { CPF } from "./cpf";

const isValidCpf = (value: string) => {
    try {
        new CPF(value)
        return true
    } catch (error) {
        return false
    }
}

export { CPF, isValidCpf };
