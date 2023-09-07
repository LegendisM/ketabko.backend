import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { OrderStatus, OrderableType } from "../interface/order.interface";
import { UserEntity } from "./../../user/entity/user.entity";
import { PaymentEntity } from "./../../payment/entity/payment.entity";

@Entity({
    name: "order",
})
export class OrderEntity {
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

    @Column()
    price: number;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => PaymentEntity, (payment) => payment.order)
    payments: PaymentEntity[];

    @ManyToOne(() => UserEntity, (user) => user.orders, { onDelete: 'CASCADE' })
    user: UserEntity;

    @RelationId((order: OrderEntity) => order.user)
    userId: string;
}