import { Book } from "src/modules/book/entity/book.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Author {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    avatar: string;

    @OneToMany(() => Book, (book) => book.author)
    books: Book[];
}