import { Module } from "@nestjs/common";
import { UsersService } from "src/users/user.service";

@Module({
    imports: [UsersService]
})
export class CommonModule { }