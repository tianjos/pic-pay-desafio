import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './repositories/account.entity';
import { User } from './repositories/user.entity';
import { AccountsService } from './services/accounts.service';
import { UsersService } from './services/user.service';

@Module({
    imports: [TypeOrmModule.forFeature([Account, User])],
    providers: [AccountsService, UsersService],
    exports: [AccountsService, UsersService]
})
export class UsersModule { }
