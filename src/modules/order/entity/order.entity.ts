import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderStatus, OrderableType } from "../interface/order.interface";
import { User } from "src/modules/user/entity/user.entity";
import { Payment } from "src/modules/payment/entity/payment.entity";

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

    @Column({
        type: 'enum',
        enum: OrderableType,
        nullable: false
    })
    entityType: OrderableType;

    @Column({ type: 'uuid', nullable: false })
    entityId: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => Payment, (payment) => payment.order)
    payments: Payment[];

    @ManyToOne(() => User, (user) => user.orders, { onDelete: 'CASCADE' })
    user: User;
}