import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BookOrder } from "./book-order.entity";
import { BookForm } from "./book-form.entity";
import { BookComment } from "./book-comment.entity";
import { BookCategoryMapping } from "./book-category.entity";

@Entity({ name: 'books' })
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    cover: string;

    @Column()
    summary: string;

    @Column()
    price: number;

    @OneToMany(() => BookCategoryMapping, (bookCategoryMapping) => bookCategoryMapping.book, { cascade: true })
    categories: BookCategoryMapping[];

    @OneToMany(() => BookForm, (bookForm) => bookForm.book, { cascade: true })
    forms: BookForm[];

    @OneToMany(() => BookOrder, (bookOrder) => bookOrder.book, { cascade: true })
    orders: BookOrder[];

    @OneToMany(() => BookComment, (bookComment) => bookComment.book, { cascade: true })
    comments: BookComment[];
}