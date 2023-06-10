import { Author } from "src/modules/author/entity/author.entity";
import { Category } from "src/modules/category/entity/category.entity";
import { StorageFile } from "src/modules/storage/entity/storage-file.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Book {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ type: 'text' })
    summary: string;

    @OneToOne(() => StorageFile, (storageFile) => storageFile.id)
    @JoinColumn()
    cover: StorageFile;

    @OneToOne(() => StorageFile, (storageFile) => storageFile.id)
    @JoinColumn()
    audio: StorageFile;

    @ManyToOne(() => Author, (author) => author.books, { onDelete: 'CASCADE' })
    author: Author;

    @ManyToMany(() => Category)
    @JoinTable()
    categories: Category[];
}