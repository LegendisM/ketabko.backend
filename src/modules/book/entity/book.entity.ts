import { Author } from "src/modules/author/entity/author.entity";
import { Category } from "src/modules/category/entity/category.entity";
import { Form } from "src/modules/form/entity/form.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Book {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    summary: string;

    @Column()
    cover: string;

    @Column()
    audio: string;

    @OneToMany(() => Form, (form) => form.book)
    forms: Form[];

    @ManyToOne(() => Author, (author) => author.books, { onDelete: 'CASCADE' })
    author: Author;

    @ManyToMany(() => Category)
    @JoinTable()
    categories: Category[];
}