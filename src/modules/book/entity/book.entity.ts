import { Author } from "src/modules/author/entity/author.entity";
import { Category } from "src/modules/category/entity/category.entity";
import { StorageFile } from "src/modules/storage/entity/storage-file.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BookSection } from "./book-section.entity";

@Entity()
export class Book {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @OneToOne(() => StorageFile, (storageFile) => storageFile.id, { eager: true, onDelete: 'SET NULL' })
    @JoinColumn()
    cover: StorageFile;

    @OneToOne(() => StorageFile, (storageFile) => storageFile.id, { eager: true, onDelete: 'SET NULL' })
    @JoinColumn()
    audio: StorageFile;

    @OneToMany(() => BookSection, (bookSection) => bookSection.book, { eager: true })
    sections: BookSection[];

    @ManyToOne(() => Author, (author) => author.books, { eager: true, onDelete: 'CASCADE' })
    author: Author;

    @ManyToMany(() => Category, { eager: true })
    @JoinTable()
    categories: Category[];
}