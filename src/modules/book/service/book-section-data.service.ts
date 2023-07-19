import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BookSection } from "../entity/book-section.entity";
import { Repository } from "typeorm";
import { CreateBookSectionDto } from "../dto/book-section/create-book-section.dto";
import { UpdateBookSectionDto } from "../dto/book-section/update-book-section.dto";

@Injectable()
export class BookSectionDataService {
    constructor(
        @InjectRepository(BookSection) private bookSectionRepository: Repository<BookSection>
    ) { }

    // async create(createDto: CreateBookSectionDto): Promise<BookSection> {
    //     const section = await this.bookSectionRepository.create(createDto);
    //     return await this.bookSectionRepository.save(section);
    // }

    // async findAll(): Promise<BookSection[]> {
    //     return await this.bookSectionRepository.find();
    // }

    // async findById(id: string, exception: boolean = false): Promise<BookSection> {
    //     const section = await this.bookSectionRepository.findOneBy({ id });
    //     if (exception && !section) {
    //         throw new NotFoundException('book.invalid-id');
    //     }
    //     return section;
    // }

    // async update(id: string, updateDto: UpdateBookSectionDto): Promise<BookSection> {
    //     const section = await this.findById(id, true);
    //     Object.assign(section, updateDto);
    //     return await this.bookSectionRepository.save(section);
    // }

    // async remove(id: string): Promise<BookSection> {
    //     const section = await this.findById(id, true);
    //     return await this.bookSectionRepository.remove(section);
    // }
}