import _ from 'lodash';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './entity/author.entity';
import { Like, Repository } from 'typeorm';
import { CreateAuthorDto } from './dto/create-author.dto';
import { StorageService } from '../storage/storage.service';
import { IPagination } from 'src/common/interface/pagination.interface';
import { FindAuthorsDto } from './dto/find-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorService {
    constructor(
        @InjectRepository(Author) private authorRepository: Repository<Author>,
        private storageService: StorageService
    ) { }

    async create(createDto: CreateAuthorDto): Promise<Author> {
        const author = this.authorRepository.create(_.omit(createDto, ['avatar']));
        author.avatar = await this.storageService.findById(createDto.avatar, true);
        return await this.authorRepository.save(author);
    }

    async findAll({ name, description, limit, page }: FindAuthorsDto): Promise<IPagination<Author>> {
        const authors = await this.authorRepository.find({
            where: [
                (name) ?
                    { name: Like(`%${name}%`) }
                    : null,
                (description) ?
                    { description: Like(`%${description}%`) }
                    : null,
            ],
            skip: (page - 1) * limit,
            take: limit - 1
        });
        const authorsCount = await this.authorRepository.count();
        return {
            items: authors,
            limit: limit,
            page: page,
            total: Math.ceil(authorsCount / limit)
        }
    }

    async findById(id: string, exception: boolean = false): Promise<Author> {
        const author = await this.authorRepository.findOneBy({ id });
        if (exception && !author) {
            throw new NotFoundException(`Invalid FindOne Author With Id ${id}`);
        }
        return author;
    }

    async update(id: string, updateDto: UpdateAuthorDto): Promise<Author> {
        const author = await this.findById(id, true);
        Object.assign(author, _.omit(updateDto, ['avatar']));
        if (author.avatar.id != updateDto.avatar) {
            author.avatar = await this.storageService.findById(updateDto.avatar, true);
        }
        return await this.authorRepository.save(author);
    }

    async remove(id: string): Promise<Author> {
        const author = await this.findById(id, true);
        return await this.authorRepository.remove(author);
    }
}
