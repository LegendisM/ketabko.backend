import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BookEntity } from "./book.entity";
import { BookSectionField } from "../class/book-section-field.class";
import { BookSectionDocumentEntity } from "./book-section-document.entity";

@Entity({
    name: "book_section",
})
export class BookSectionEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column('simple-array', {
        default: [],
        transformer: {
            from: (value) => JSON.parse(value),
            to: (value) => JSON.stringify(value)
        }
    })
    fields: BookSectionField[];

    @OneToMany(() => BookSectionDocumentEntity, (sectionDocument) => sectionDocument.section)
    documents: BookSectionDocumentEntity[];

    @ManyToOne(() => BookEntity, (book) => book.sections, { onDelete: 'CASCADE' })
    book: BookEntity;
}