import { Order } from "src/modules/order/entity/order.entity";
import { AfterUpdate, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PaymentStatus } from "../interface/payment.interface";
import { User } from "src/modules/user/entity/user.entity";
import { PaymentDriverType } from "../interface/payment-driver.interface";

@Entity()
export class Payment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'enum',
        enum: PaymentDriverType
    })
    driver: PaymentDriverType;

    @Column()
    authority: string;

    @Column()
    tracking: string;

    @Column({
        type: 'enum',
        enum: PaymentStatus,
        default: PaymentStatus.Pending,
    })
    status: PaymentStatus;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => Order, (order) => order.payments, { eager: true, onDelete: 'CASCADE' })
    order: Order;

    @ManyToOne(() => User, (user) => user.payments, { eager: true, onDelete: 'CASCADE' })
    user: User;
}