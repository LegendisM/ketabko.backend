import { AuthorEntity } from "./../../author/entity/author.entity";
import { CategoryEntity } from "./../../category/entity/category.entity";
import { StorageFileEntity } from "./../../storage/entity/storage-file.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BookSectionEntity } from "./book-section.entity";

@Entity({
    name: "book",
})
export class BookEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @ManyToOne(() => StorageFileEntity, (storageFile) => storageFile.id, { eager: true, onDelete: 'SET NULL' })
    @JoinColumn()
    cover: StorageFileEntity;

    @ManyToOne(() => StorageFileEntity, (storageFile) => storageFile.id, { eager: true, onDelete: 'SET NULL' })
    @JoinColumn()
    audio: StorageFileEntity;

    @OneToMany(() => BookSectionEntity, (bookSection) => bookSection.book, { eager: true })
    sections: BookSectionEntity[];

    @ManyToOne(() => AuthorEntity, (author) => author.books, { eager: true, onDelete: 'CASCADE' })
    author: AuthorEntity;

    @ManyToMany(() => CategoryEntity, { eager: true })
    @JoinTable()
    categories: CategoryEntity[];
}