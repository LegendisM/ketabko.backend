import _ from 'lodash';
import slugify from "slugify";
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from '../dto/book/create-book.dto';
import { BookEntity } from '../entity/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindOptionsWhere, Like, Repository } from 'typeorm';
import { UpdateBookDto } from '../dto/book/update-book.dto';
import { FindBooksDto } from '../dto/book/find-book.dto';
import { IPagination } from './../../../common/interface/pagination.interface';
import { StorageService } from '../../storage/storage.service';
import { AuthorService } from './../../author/author.service';
import { DatabaseSource } from 'src/database/interface/database.interface';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(BookEntity, DatabaseSource.Primary) private bookRepository: Repository<BookEntity>,
        private authorService: AuthorService,
        private storageService: StorageService
    ) { }

    async create(createDto: CreateBookDto): Promise<BookEntity> {
        const book = this.bookRepository.create(_.omit(createDto, ['author', 'cover', 'audio']));
        book.author = await this.authorService.findById(createDto.author, true);
        book.cover = await this.storageService.findById(createDto.cover, true);
        book.audio = await this.storageService.findById(createDto.audio, true);
        return await this.bookRepository.save(book);
    }

    async findAll({ title, description, minPrice, maxPrice, category, limit, page }: FindBooksDto, mergeCondition: boolean = false): Promise<IPagination<BookEntity>> {
        let where: FindOptionsWhere<BookEntity>[] = [
            (title) ?
                { title: Like(`%${title}%`) }
                : null,
            (description) ?
                { description: Like(`%${description}%`) }
                : null,
            (minPrice && maxPrice) ?
                { price: Between(minPrice, maxPrice) }
                : null,
            (category) ?
                { categories: { slug: slugify(category) } }
                : null
        ].filter(condition => !!condition);
        where = mergeCondition ? [_.reduce(where, (previous, current) => _.merge(previous, current))] : where;
        const books = await this.bookRepository.find({
            where: where,
            skip: (page - 1) * limit,
            take: limit
        });
        const booksCount = await this.bookRepository.count({ where });
        return {
            items: books,
            limit: limit,
            page: page,
            total: Math.ceil(booksCount / limit)
        };
    }

    async findById(id: string, exception: boolean = false): Promise<BookEntity> {
        const book = await this.bookRepository.findOneBy({ id });
        if (exception && !book) {
            throw new NotFoundException('book.invalid-id');
        }
        return book;
    }

    async update(id: string, updateDto: UpdateBookDto): Promise<BookEntity> {
        const book = await this.findById(id, true);
        Object.assign(book, _.omit(updateDto, ['cover', 'audio']));
        if (book.cover.id != updateDto.cover) {
            book.cover = await this.storageService.findById(updateDto.cover, true);
        }
        if (book.audio.id != updateDto.audio) {
            book.audio = await this.storageService.findById(updateDto.audio, true);
        }
        return await this.bookRepository.save(book);
    }

    async remove(id: string): Promise<BookEntity> {
        const book = await this.findById(id, true);
        return await this.bookRepository.remove(book);
    }
}
