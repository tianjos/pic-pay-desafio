import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/repositories/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>
    ) { }

    existsById(id: number) {
        return this.usersRepository.exists({ where: { id } })
    }

    getById(id: number) {
        return this.usersRepository.findOne({ where: { id }, relations: { account: true } })
    }
}