import { User } from "src/modules/user/entity/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./book.entity";

@Entity({ name: 'book_orders' })
export class BookOrder {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ generated: 'uuid' })
    trackingCode: string;

    @CreateDateColumn()
    createdDate: Date;

    @ManyToOne(() => User, (user) => user.books)
    user: User;

    @ManyToOne(() => Book, (book) => book.orders)
    book: Book;
}