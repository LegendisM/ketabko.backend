import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { OrderStatus } from "../interface/order.interface";

@Entity({ name: 'orders' })
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
}