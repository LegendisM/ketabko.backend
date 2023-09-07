import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { BookSectionEntity } from "./book-section.entity";
import { UserEntity } from "./../../user/entity/user.entity";
import { BookSectionFieldValue } from "../class/book-section-field-value.class";

@Entity({
    name: "book_section_document",
})
export class BookSectionDocumentEntity {
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
    values: BookSectionFieldValue[];

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => BookSectionEntity, (section) => section.documents, { eager: true, onDelete: 'CASCADE' })
    section: BookSectionEntity;

    @ManyToOne(() => UserEntity, (user) => user.bookSectionDocuments, { onDelete: 'CASCADE' })
    user: UserEntity;

    @RelationId((bookSectionDocument: BookSectionDocumentEntity) => bookSectionDocument.user)
    userId: string;
}