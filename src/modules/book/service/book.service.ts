import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from '../dto/book/create-book.dto';
import { Book } from '../entity/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateBookDto } from '../dto/book/update-book.dto';
import { FindBooksDto } from '../dto/book/find-books.dto';
import { IPagination } from 'src/common/interface/pagination.interface';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(Book) private bookRepository: Repository<Book>
    ) { }

    async create(createDto: CreateBookDto): Promise<Book> {
        const book = await this.bookRepository.create(createDto);
        return await this.bookRepository.save(book);
    }

    async findAll({ title, description, price, limit, page }: FindBooksDto): Promise<IPagination<Book>> {
        const books = await this.bookRepository.createQueryBuilder()
            .where('title LIKE :title', { title }) // TODO
            .orWhere('description LIKE :description', { description })  // TODO
            .orWhere('price <= :price', { price })  // TODO
            .skip((page - 1) * limit)
            .limit(limit - 1)
            .getMany();
        const booksCount = await this.bookRepository.count();
        return {
            items: books,
            limit: limit,
            page: page,
            total: Math.ceil(booksCount / limit)
        }
    }

    async findById(id: number, exception: boolean = false): Promise<Book> {
        const book = await this.bookRepository.findOneBy({ id });
        if (exception && !book) {
            throw new NotFoundException(`Invalid FindOne Book With Id ${id}`);
        }
        return book;
    }

    async update(id: number, updateDto: UpdateBookDto): Promise<Book> {
        const book = await this.findById(id, true);
        Object.assign(book, updateDto);
        return await this.bookRepository.save(book);
    }

    async remove(id: number): Promise<Book> {
        const book = await this.findById(id, true);
        return await this.bookRepository.remove(book);
    }
}
