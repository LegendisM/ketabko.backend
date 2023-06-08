import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Book {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    cover: string;

    @Column()
    summary: string;

    @Column()
    price: number;
}