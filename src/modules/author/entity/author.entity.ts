import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'authors' })
export class Author {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    avatar: string;
}