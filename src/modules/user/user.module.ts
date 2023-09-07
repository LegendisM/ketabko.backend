import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entity/user.entity";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { DatabaseSource } from "src/database/interface/database.interface";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity], DatabaseSource.Primary),
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule { }