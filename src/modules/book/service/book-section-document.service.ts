import _, { merge } from "lodash";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { BookSectionDocument } from "../entity/book-section-document.entity";
import { CreateBookSectionDocumentDto } from "../dto/book-section-document/create-book-section-document.dto";
import { UpdateBookSectionDocumentDto } from "../dto/book-section-document/update-book-section-document.dto";
import { BookSectionService } from "./book-section.service";
import { IPagination } from "src/common/interface/pagination.interface";
import { User } from "src/modules/user/entity/user.entity";
import { FindBookSectionDocumentsDto } from "../dto/book-section-document/find-book-section-document.dto";

@Injectable()
export class BookSectionDocumentService {
    constructor(
        @InjectRepository(BookSectionDocument) private bookSectionDocumentRepository: Repository<BookSectionDocument>,
        private bookSectionService: BookSectionService
    ) { }

    async create(createDto: CreateBookSectionDocumentDto, user: User): Promise<BookSectionDocument> {
        const document = await this.bookSectionDocumentRepository.create(_.omit(createDto, ['section']));
        document.section = await this.bookSectionService.findById(createDto.section, true);
        document.user = user;
        return await this.bookSectionDocumentRepository.save(document);
    }

    async findAll({ section, user, limit, page }: FindBookSectionDocumentsDto, mergeCondition: boolean = false): Promise<IPagination<BookSectionDocument>> {
        let where: FindOptionsWhere<BookSectionDocument>[] = [
            (section) ? { section: { id: section } } : null,
            (user) ? { user: { id: user } } : null
        ].filter(condition => !!condition);
        where = mergeCondition ? [_.reduce(where, (previous, current) => _.merge(previous, current))] : where;
        const documents = await this.bookSectionDocumentRepository.find({
            where: where,
            skip: (page - 1) * limit,
            take: limit
        });
        const documentCount = await this.bookSectionDocumentRepository.count({ where });
        return {
            limit: limit,
            page: page,
            items: documents,
            total: Math.ceil(documentCount / limit)
        };
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