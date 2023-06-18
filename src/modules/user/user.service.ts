import _ from "lodash";
import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) { }

    async create(createDto: CreateUserDto): Promise<User> {
        const user = this.userRepository.create(createDto);
        return await this.userRepository.save(user);
    }

    async findOne(filter: FindOptionsWhere<User>, exception: boolean = false): Promise<User> {
        const user = await this.userRepository.findOne({ where: filter });
        if (exception && !user) {
            throw new NotFoundException('user.invalid-findone');
        }
        return user;
    }

    async findById(id: string, exception: boolean = false): Promise<User> {
        const user = await this.userRepository.findOneBy({ id });
        if (exception && !user) {
            throw new NotFoundException('user.invalid-id');
        }
        return user;
    }

    async update(id: string, updateDto: UpdateUserDto): Promise<User> {
        const user = await this.findById(id, true);
        Object.assign(user, updateDto);
        return await this.userRepository.save(user);
    }

    async remove(id: string): Promise<User> {
        const user = await this.findById(id, true);
        return await this.userRepository.remove(user);
    }
}