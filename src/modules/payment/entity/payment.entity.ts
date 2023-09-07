import { OrderEntity } from "./../../order/entity/order.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { PaymentStatus } from "../interface/payment.interface";
import { UserEntity } from "./../../../modules/user/entity/user.entity";
import { PaymentDriverType } from "../interface/payment-driver.interface";

@Entity({
    name: "payment",
})
export class PaymentEntity {
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

    @ManyToOne(() => OrderEntity, (order) => order.payments, { eager: true, onDelete: 'CASCADE' })
    order: OrderEntity;

    @ManyToOne(() => UserEntity, (user) => user.payments, { eager: true, onDelete: 'CASCADE' })
    user: UserEntity;

    @RelationId((payment: PaymentEntity) => payment.user)
    userId: string;
}