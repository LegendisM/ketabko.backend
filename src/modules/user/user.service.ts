import _ from "lodash";
import { Injectable, NotFoundException } from "@nestjs/common";
import { UserEntity } from "./entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { DatabaseSource } from "src/database/interface/database.interface";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity, DatabaseSource.Primary) private userRepository: Repository<UserEntity>,
    ) { }

    async create(createDto: CreateUserDto): Promise<UserEntity> {
        const user = this.userRepository.create(createDto);
        return await this.userRepository.save(user);
    }

    async findOne(filter: FindOptionsWhere<UserEntity>, exception: boolean = false): Promise<UserEntity> {
        const user = await this.userRepository.findOne({ where: filter });
        if (exception && !user) {
            throw new NotFoundException('user.invalid-findone');
        }
        return user;
    }

    async findById(id: string, exception: boolean = false): Promise<UserEntity> {
        const user = await this.userRepository.findOneBy({ id });
        if (exception && !user) {
            throw new NotFoundException('user.invalid-id');
        }
        return user;
    }

    async update(id: string, updateDto: UpdateUserDto): Promise<UserEntity> {
        const user = await this.findById(id, true);
        Object.assign(user, updateDto);
        return await this.userRepository.save(user);
    }

    async remove(id: string): Promise<UserEntity> {
        const user = await this.findById(id, true);
        return await this.userRepository.remove(user);
    }
}