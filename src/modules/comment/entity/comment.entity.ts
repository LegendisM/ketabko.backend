import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'comments' })
export class Comment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    message: string;
}
