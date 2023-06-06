import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./book.entity";

@Entity({ name: 'book_categories' })
export class BookCategory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @OneToMany(() => BookCategoryMapping, (bookCategoryMapping) => bookCategoryMapping.category, { cascade: true })
    mappings: BookCategoryMapping[];
}

@Entity({ name: 'book_category_mappings' })
export class BookCategoryMapping {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Book, (book) => book.categories)
    book: Book;

    @ManyToOne(() => BookCategory, (bookCategory) => bookCategory.mappings)
    category: BookCategory;
}
