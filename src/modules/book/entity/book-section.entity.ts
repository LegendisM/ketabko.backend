import { StorageFile } from "src/modules/storage/entity/storage-file.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./book.entity";
import { BookField } from "../class/book-field.class";
import { BookSectionData } from "./book-section-data.entity";

@Entity()
export class BookSection {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column('simple-json', {
        default: [],
        transformer: {
            from: (value) => JSON.parse(value),
            to: (value) => JSON.stringify(value)
        }
    })
    fields: BookField[];

    @OneToMany(() => BookSectionData, (sectionData) => sectionData.section)
    datas: BookSectionData[];

    @ManyToOne(() => Book, (book) => book.sections, { onDelete: 'CASCADE' })
    book: Book;
}