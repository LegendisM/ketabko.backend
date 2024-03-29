import _ from "lodash";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BookSectionEntity } from "../entity/book-section.entity";
import { Repository } from "typeorm";
import { CreateBookSectionDto } from "../dto/book-section/create-book-section.dto";
import { UpdateBookSectionDto } from "../dto/book-section/update-book-section.dto";
import { BookService } from "./book.service";
import { DatabaseSource } from "src/database/interface/database.interface";

@Injectable()
export class BookSectionService {
    constructor(
        @InjectRepository(BookSectionEntity, DatabaseSource.Primary) private bookSectionRepository: Repository<BookSectionEntity>,
        private bookService: BookService
    ) { }

    async create(createDto: CreateBookSectionDto): Promise<BookSectionEntity> {
        const section = await this.bookSectionRepository.create(_.omit(createDto, ['book']));
        section.book = await this.bookService.findById(createDto.book, true);
        return await this.bookSectionRepository.save(section);
    }

    async findAll(): Promise<BookSectionEntity[]> {
        return await this.bookSectionRepository.find();
    }

    async findById(id: string, exception: boolean = false): Promise<BookSectionEntity> {
        const section = await this.bookSectionRepository.findOneBy({ id });
        if (exception && !section) {
            throw new NotFoundException('book.invalid-section-id');
        }
        return section;
    }

    async update(id: string, updateDto: UpdateBookSectionDto): Promise<BookSectionEntity> {
        const section = await this.findById(id, true);
        Object.assign(section, updateDto);
        return await this.bookSectionRepository.save(section);
    }

    async remove(id: string): Promise<BookSectionEntity> {
        const section = await this.findById(id, true);
        return await this.bookSectionRepository.remove(section);
    }
}