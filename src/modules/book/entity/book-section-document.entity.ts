import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BookSection } from "./book-section.entity";
import { User } from "src/modules/user/entity/user.entity";
import { BookSectionFieldValue } from "../class/book-section-field-value.class";

@Entity()
export class BookSectionDocument {
    @PrimaryGeneratedColumn()
    id: string;

    @Column('simple-json', {
        default: [],
        transformer: {
            from: (value) => JSON.parse(value),
            to: (value) => JSON.stringify(value)
        }
    })
    values: BookSectionFieldValue[];

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => BookSection, (section) => section.documents, { onDelete: 'CASCADE' })
    section: BookSection;

    @ManyToOne(() => User, (user) => user.bookSectionDocuments, { onDelete: 'CASCADE' })
    user: User;
}