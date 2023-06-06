import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BookComment } from "src/modules/book/entity/book-comment.entity";
import { BookFormItemMapping } from "src/modules/book/entity/book-form-item.entity";
import { BookOrder } from "src/modules/book/entity/book-order.entity";
import { Role } from "../interface/role.interface";

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column({ nullable: true })
    email: string;

    @Column()
    password: string;

    @Column('simple-array', {
        default: [Role.User],
        transformer: {
            from: (value) => JSON.parse(value),
            to: (value) => JSON.stringify(value)
        }
    })
    roles: string[];

    @OneToMany(() => BookOrder, (bookOrder) => bookOrder.user, { cascade: true })
    books: BookOrder[];

    @OneToMany(() => BookComment, (bookComment) => bookComment.user, { cascade: true })
    booksComments: BookComment[];

    @OneToMany(() => BookFormItemMapping, (bookFormItemMapping) => bookFormItemMapping.user, { cascade: true })
    booksFormsItemsMappings: BookFormItemMapping[];
}