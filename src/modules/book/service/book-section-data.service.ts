import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BookSectionData } from "../entity/book-section-data.entity";
import { CreateBookSectionDataDto } from "../dto/book-section-data/create-book-section-data.dto";
import { UpdateBookSectionDataDto } from "../dto/book-section-data/update-book-section-data.dto";
import { BookSectionService } from "./book-section.service";
import _ from "lodash";
import { User } from "src/modules/user/entity/user.entity";

@Injectable()
export class BookSectionDataService {
    constructor(
        @InjectRepository(BookSectionData) private bookSectionDataRepository: Repository<BookSectionData>,
        private bookSectionService: BookSectionService
    ) { }

    async create(createDto: CreateBookSectionDataDto): Promise<BookSectionData> {
        const data = await this.bookSectionDataRepository.create(_.omit(createDto, ['section']));
        data.section = await this.bookSectionService.findById(createDto.section, true);
        return await this.bookSectionDataRepository.save(data);
    }

    async findAll(): Promise<BookSectionData[]> {
        return await this.bookSectionDataRepository.find();
    }

    async findAllByUser(user: User): Promise<BookSectionData[]> {
        return await this.bookSectionDataRepository.findBy({ user: { id: user.id } });
    }

    async findById(id: string, exception: boolean = false): Promise<BookSectionData> {
        const section = await this.bookSectionDataRepository.findOneBy({ id });
        if (exception && !section) {
            throw new NotFoundException('book.invalid-section-data-id');
        }
        return section;
    }

    async update(id: string, updateDto: UpdateBookSectionDataDto): Promise<BookSectionData> {
        const section = await this.findById(id, true);
        Object.assign(section, updateDto);
        return await this.bookSectionDataRepository.save(section);
    }

    async remove(id: string): Promise<BookSectionData> {
        const section = await this.findById(id, true);
        return await this.bookSectionDataRepository.remove(section);
    }
}