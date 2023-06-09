import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../interface/role.interface";
import { Order } from "src/modules/order/entity/order.entity";
import { Comment } from "src/modules/comment/entity/comment.entity";
import { Document } from "src/modules/document/entity/document.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    username: string;

    @Column({ nullable: true })
    phone: string;

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
    roles: Role[];

    @Column({ nullable: true })
    avatar?: string;

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[];

    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[];

    @OneToMany(() => Document, (document) => document.user)
    documents: Document[];
}