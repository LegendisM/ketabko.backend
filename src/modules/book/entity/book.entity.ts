import { Product } from "src/modules/product/entity/product.entity";
import { ChildEntity, Column, PrimaryGeneratedColumn } from "typeorm";

@ChildEntity()
export class Book extends Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    summary: string;

    @Column()
    cover: string;

    @Column()
    audio: string;

    @Column()
    author: string; // TODO: Seprate Module
}