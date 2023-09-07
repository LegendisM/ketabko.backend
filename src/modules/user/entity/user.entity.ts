import { Column, Entity, JoinColumn, OneToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../interface/role.interface";
import { OrderEntity } from "./../../order/entity/order.entity";
import { CommentEntity } from "./../../comment/entity/comment.entity";
import { StorageFileEntity } from "./../../storage/entity/storage-file.entity";
import { Exclude } from "class-transformer";
import { PaymentEntity } from "./../../payment/entity/payment.entity";
import { BookSectionDocumentEntity } from "./../../book/entity/book-section-document.entity";

@Entity({
    name: "user",
})
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    username: string;

    @Column({ nullable: true })
    phone: string;

    @Column({ nullable: true })
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column({ default: 0 })
    level: number;

    @Column('simple-array', {
        default: [Role.User],
        transformer: {
            from: (value) => JSON.parse(value),
            to: (value) => JSON.stringify(value)
        }
    })
    roles: Role[];

    @ManyToOne(() => StorageFileEntity, (storageFile) => storageFile.id, { eager: true, onDelete: 'SET NULL' })
    @JoinColumn()
    avatar: StorageFileEntity;

    @OneToMany(() => OrderEntity, (order) => order.user)
    orders: OrderEntity[];

    @OneToMany(() => CommentEntity, (comment) => comment.user)
    comments: CommentEntity[];

    @OneToMany(() => StorageFileEntity, (storageFile) => storageFile.user)
    files: StorageFileEntity[];

    @OneToMany(() => PaymentEntity, (payment) => payment.user)
    payments: PaymentEntity[];

    @OneToMany(() => BookSectionDocumentEntity, (bookSectionDocument) => bookSectionDocument.user)
    bookSectionDocuments: BookSectionDocumentEntity[];
}