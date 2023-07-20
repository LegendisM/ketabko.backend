import _ from "lodash";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BookSectionDocument } from "../entity/book-section-document.entity";
import { CreateBookSectionDocumentDto } from "../dto/book-section-document/create-book-section-document.dto";
import { UpdateBookSectionDocumentDto } from "../dto/book-section-document/update-book-section-document.dto";
import { BookSectionService } from "./book-section.service";
import { User } from "src/modules/user/entity/user.entity";

@Injectable()
export class BookSectionDocumentService {
    constructor(
        @InjectRepository(BookSectionDocument) private bookSectionDocumentRepository: Repository<BookSectionDocument>,
        private bookSectionService: BookSectionService
    ) { }

    async create(createDto: CreateBookSectionDocumentDto): Promise<BookSectionDocument> {
        const document = await this.bookSectionDocumentRepository.create(_.omit(createDto, ['section']));
        document.section = await this.bookSectionService.findById(createDto.section, true);
        return await this.bookSectionDocumentRepository.save(document);
    }

    async findAll(): Promise<BookSectionDocument[]> {
        return await this.bookSectionDocumentRepository.find();
    }

    async findAllByUser(user: User): Promise<BookSectionDocument[]> {
        return await this.bookSectionDocumentRepository.findBy({ user: { id: user.id } });
    }

    async findById(id: string, exception: boolean = false): Promise<BookSectionDocument> {
        const section = await this.bookSectionDocumentRepository.findOneBy({ id });
        if (exception && !section) {
            throw new NotFoundException('book.invalid-section-document-id');
        }
        return section;
    }

    async update(id: string, updateDto: UpdateBookSectionDocumentDto): Promise<BookSectionDocument> {
        const section = await this.findById(id, true);
        Object.assign(section, updateDto);
        return await this.bookSectionDocumentRepository.save(section);
    }

    async remove(id: string): Promise<BookSectionDocument> {
        const section = await this.findById(id, true);
        return await this.bookSectionDocumentRepository.remove(section);
    }
}