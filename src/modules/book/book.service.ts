import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './entity/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateBookDto } from './dto/update-book.dto';
import { FindBooksDto } from './dto/find-books.dto';
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
        // TODO: Complete Search Options
        const books = await this.bookRepository.createQueryBuilder()
            .where('title LIKE :title', { title })
            .orWhere('description LIKE :description', { description })
            .orWhere('price <= :price', { price })
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

    async findById(id: string, exception: boolean = false): Promise<Book> {
        const book = await this.bookRepository.findOneBy({ id });
        if (exception && !book) {
            throw new NotFoundException(`Invalid FindOne Book With Id ${id}`);
        }
        return book;
    }

    async update(id: string, updateDto: UpdateBookDto): Promise<Book> {
        const book = await this.findById(id, true);
        Object.assign(book, updateDto);
        return await this.bookRepository.save(book);
    }

    async remove(id: string): Promise<Book> {
        const book = await this.findById(id, true);
        return await this.bookRepository.remove(book);
    }
}
