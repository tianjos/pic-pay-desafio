import { IsEmail, IsOptional, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {
    @IsString()
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