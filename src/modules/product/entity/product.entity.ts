import { Order } from "src/modules/order/entity/order.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductableType } from "../interface/product.interface";
import { StorageFile } from "src/modules/storage/entity/storage-file.entity";

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

    @OneToOne(() => StorageFile, (storageFile) => storageFile.id)
    @JoinColumn()
    cover: StorageFile;

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