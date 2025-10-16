import { IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from "class-validator";
import { IsCPF } from "src/common/validators/cpf.validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @IsCPF()
    name: string

    @IsEmail()
    email: string

    @IsStrongPassword()
    password: string

    @IsOptional()
    cpf: string

    @IsOptional()
    cnpj: string
}