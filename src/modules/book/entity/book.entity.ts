import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'books' })
export class Book {
    @PrimaryGeneratedColumn('uuid')
    id: string;

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
}