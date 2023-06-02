import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) { }

    async create(createDto: CreateUserDto): Promise<User> {
        const user = await this.userRepository.create(createDto);
        return await this.userRepository.save(user);
    }

    async findOne(filter: Partial<User>, exception: boolean = false): Promise<User> {
        const user = await this.userRepository.findOne({ where: filter });
        if (exception && !user) {
            throw new NotFoundException('Invalid FindOne User With This Filter');
        }
        return user;
    }

    async findById(id: string, exception: boolean = false): Promise<User> {
        const user = await this.userRepository.findOneBy({ id });
        if (exception && !user) {
            throw new NotFoundException(`Invalid FindOne User With Id ${id}`);
        }
        return user;
    }

    async update(id: string, updateDto: UpdateUserDto) {
        const user = await this.findById(id, true);
        Object.assign(user, updateDto);
        return await this.userRepository.save(user);
    }

    async remove(id: string) {
        const user = await this.findById(id, true);
        return await this.userRepository.remove(user);
    }
}