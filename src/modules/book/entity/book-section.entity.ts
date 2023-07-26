import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./book.entity";
import { BookSectionField } from "../class/book-section-field.class";
import { BookSectionDocument } from "./book-section-document.entity";

@Entity()
export class BookSection {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column('simple-array',{
        default: [],
        transformer: {
            from: (value) => JSON.parse(value),
            to: (value) => JSON.stringify(value)
        }
    })
    fields: BookSectionField[];

    @OneToMany(() => BookSectionDocument, (sectionDocument) => sectionDocument.section)
    documents: BookSectionDocument[];

    @ManyToOne(() => Book, (book) => book.sections, { onDelete: 'CASCADE' })
    book: Book;
}