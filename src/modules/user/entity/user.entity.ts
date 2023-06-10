import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../interface/role.interface";
import { Order } from "src/modules/order/entity/order.entity";
import { Comment } from "src/modules/comment/entity/comment.entity";
import { StorageFile } from "src/modules/storage/entity/storage-file.entity";

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

    @OneToOne(() => StorageFile, (storageFile) => storageFile.id)
    @JoinColumn()
    avatar: StorageFile;

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[];

    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[];

    @OneToMany(() => StorageFile, (storageFile) => storageFile.user)
    files: StorageFile[];
}