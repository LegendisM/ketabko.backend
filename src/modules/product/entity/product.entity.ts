import { Column, Entity, PrimaryGeneratedColumn, TableInheritance } from "typeorm";

@Entity({ name: 'products' })
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    price: number;
}