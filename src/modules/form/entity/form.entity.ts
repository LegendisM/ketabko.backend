import { Book } from "src/modules/book/entity/book.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FormItem } from "./form-item.entity";
import { Document } from "src/modules/document/entity/document.entity";

@Entity()
export class Form {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @OneToMany(() => FormItem, (formItem) => formItem.form)
    items: FormItem[];

    @OneToMany(() => Document, (document) => document.form)
    documents: Document[];

    @ManyToOne(() => Book, (book) => book.forms, { onDelete: 'CASCADE' })
    book: Book;
}