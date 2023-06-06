import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./book.entity";
import { User } from "src/modules/user/entity/user.entity";

@Entity({ name: 'book_comments' })
export class BookComment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    message: string;

    @ManyToOne(() => User, (user) => user.booksComments)
    user: User;

    @ManyToOne(() => Book, (book) => book.comments)
    book: Book;
}
