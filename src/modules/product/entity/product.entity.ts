import { Order } from "src/modules/order/entity/order.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductableType } from "../interface/product.interface";

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column({
        type: 'enum',
        enum: ProductableType,
        nullable: false
    })
    entityType: ProductableType;

    @Column({ type: 'uuid', nullable: false })
    entityId: string;

    @OneToMany(() => Order, (order) => order.product)
    orders: Order[];
}