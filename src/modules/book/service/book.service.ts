import _ from 'lodash';
import slugify from "slugify";
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from '../dto/book/create-book.dto';
import { Book } from '../entity/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Like, Repository } from 'typeorm';
import { UpdateBookDto } from '../dto/book/update-book.dto';
import { FindBooksDto } from '../dto/book/find-book.dto';
import { IPagination } from 'src/common/interface/pagination.interface';
import { StorageService } from '../../storage/storage.service';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(Book) private bookRepository: Repository<Book>,
        private storageService: StorageService
    ) { }

    async create(createDto: CreateBookDto): Promise<Book> {
        const book = this.bookRepository.create(_.omit(createDto, ['cover', 'audio']));
        book.cover = await this.storageService.findById(createDto.cover, true);
        book.audio = await this.storageService.findById(createDto.audio, true);
        return await this.bookRepository.save(book);
    }

    async findAll({ title, description, minPrice, maxPrice, category, limit, page }: FindBooksDto): Promise<IPagination<Book>> {
        const books = await this.bookRepository.find({
            where: [
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
            ],
            skip: (page - 1) * limit,
            take: limit - 1
        });
        const booksCount = await this.bookRepository.count();
        return {
            items: books,
            limit: limit,
            page: page,
            total: Math.ceil(booksCount / limit)
        };
    }

    async findById(id: string, exception: boolean = false): Promise<Book> {
        const book = await this.bookRepository.findOneBy({ id });
        if (exception && !book) {
            throw new NotFoundException('book.invalid-id');
        }
        return book;
    }

    async update(id: string, updateDto: UpdateBookDto): Promise<Book> {
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

    async remove(id: string): Promise<Book> {
        const book = await this.findById(id, true);
        return await this.bookRepository.remove(book);
    }
}
