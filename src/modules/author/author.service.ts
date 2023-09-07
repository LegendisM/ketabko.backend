import _ from 'lodash';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorEntity } from './entity/author.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { CreateAuthorDto } from './dto/create-author.dto';
import { StorageService } from '../storage/storage.service';
import { IPagination } from './../../common/interface/pagination.interface';
import { FindAuthorsDto } from './dto/find-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { DatabaseSource } from 'src/database/interface/database.interface';

@Injectable()
export class AuthorService {
    constructor(
        @InjectRepository(AuthorEntity, DatabaseSource.Primary) private authorRepository: Repository<AuthorEntity>,
        private storageService: StorageService
    ) { }

    async create(createDto: CreateAuthorDto): Promise<AuthorEntity> {
        const author = this.authorRepository.create(_.omit(createDto, ['avatar']));
        author.avatar = await this.storageService.findById(createDto.avatar, true);
        return await this.authorRepository.save(author);
    }

    async findAll({ name, description, limit, page }: FindAuthorsDto, mergeCondition: boolean = false): Promise<IPagination<AuthorEntity>> {
        let where: FindOptionsWhere<AuthorEntity>[] = [
            (name) ?
                { name: Like(`%${name}%`) }
                : null,
            (description) ?
                { description: Like(`%${description}%`) }
                : null,
        ].filter(condition => !!condition);
        where = mergeCondition ? [_.reduce(where, (previous, current) => _.merge(previous, current))] : where;
        const authors = await this.authorRepository.find({
            where: where,
            skip: (page - 1) * limit,
            take: limit - 1
        });
        const authorsCount = await this.authorRepository.count({ where });
        return {
            items: authors,
            limit: limit,
            page: page,
            total: Math.ceil(authorsCount / limit)
        }
    }

    async findById(id: string, exception: boolean = false): Promise<AuthorEntity> {
        const author = await this.authorRepository.findOneBy({ id });
        if (exception && !author) {
            throw new NotFoundException('author.invalid-id');
        }
        return author;
    }

    async update(id: string, updateDto: UpdateAuthorDto): Promise<AuthorEntity> {
        const author = await this.findById(id, true);
        Object.assign(author, _.omit(updateDto, ['avatar']));
        if (author.avatar.id != updateDto.avatar) {
            author.avatar = await this.storageService.findById(updateDto.avatar, true);
        }
        return await this.authorRepository.save(author);
    }

    async remove(id: string): Promise<AuthorEntity> {
        const author = await this.findById(id, true);
        return await this.authorRepository.remove(author);
    }
}
