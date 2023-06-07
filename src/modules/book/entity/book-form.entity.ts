import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'book_forms' })
export class BookForm {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;
}