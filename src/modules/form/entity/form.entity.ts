import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'forms' })
export class Form {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;
}