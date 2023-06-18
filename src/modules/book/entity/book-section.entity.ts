import { StorageFile } from "src/modules/storage/entity/storage-file.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./book.entity";

@Entity()
export class BookSection {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @OneToOne(() => StorageFile, (storageFile) => storageFile.id, { eager: true, onDelete: 'SET NULL' })
    @JoinColumn()
    audio: StorageFile;

    @ManyToOne(() => Book, (book) => book.sections, { onDelete: 'CASCADE' })
    book: Book;
}