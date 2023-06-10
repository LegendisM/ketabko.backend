import { Book } from "src/modules/book/entity/book.entity";
import { StorageFile } from "src/modules/storage/entity/storage-file.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Author {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ type: 'text' })
    description: string;

    @OneToOne(() => StorageFile, (storageFile) => storageFile.id)
    @JoinColumn()
    avatar: StorageFile;

    @OneToMany(() => Book, (book) => book.author)
    books: Book[];
}