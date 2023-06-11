import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderStatus, OrderableType } from "../interface/order.interface";
import { User } from "src/modules/user/entity/user.entity";

@Entity()
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ default: '' })
    note: string;

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

    @ManyToOne(() => User, (user) => user.orders, { onDelete: 'CASCADE' })
    user: User;
}