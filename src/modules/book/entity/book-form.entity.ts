import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./book.entity";
import { BookFormItem } from "./book-form-item.entity";

@Entity({ name: 'book_forms' })
export class BookForm {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @ManyToOne(() => Book, (book) => book.forms)
    book: Book;

    @OneToMany(() => BookFormItem, (bookFormItem) => bookFormItem.form, { cascade: true })
    items: BookFormItem[];
}