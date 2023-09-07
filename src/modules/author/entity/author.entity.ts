import { BookEntity} from "./../../book/entity/book.entity";
import { StorageFileEntity } from "./../../storage/entity/storage-file.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "author",
})
export class AuthorEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ type: 'text' })
    description: string;

    @ManyToOne(() => StorageFileEntity, (storageFile) => storageFile.id, { eager: true, onDelete: 'SET NULL' })
    @JoinColumn()
    avatar: StorageFileEntity;

    @OneToMany(() => BookEntity, (book) => book.author)
    books: BookEntity[];
}