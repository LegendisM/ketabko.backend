import { Book } from "src/modules/book/entity/book.entity";
import { StorageFile } from "src/modules/storage/entity/storage-file.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Author {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ type: 'text' })
    description: string;

    @ManyToOne(() => StorageFile, (storageFile) => storageFile.id, { eager: true, onDelete: 'SET NULL' })
    @JoinColumn()
    avatar: StorageFile;

    @OneToMany(() => Book, (book) => book.author)
    books: Book[];
}