import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderStatus } from "../interface/order.interface";
import { User } from "src/modules/user/entity/user.entity";
import { Product } from "src/modules/product/entity/product.entity";

@Entity()
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'enum',
        enum: OrderStatus,
        default: OrderStatus.Pending
    })
    status: OrderStatus;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User, (user) => user.orders, { onDelete: 'CASCADE' })
    user: User;

    @ManyToOne(() => Product, (product) => product.orders, { onDelete: 'CASCADE' })
    product: Product;
}