import { User } from "src/modules/user/entity/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class StorageFile {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    mime: string;

    @Column()
    size: number;

    @Column()
    path: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User, (user) => user.files, { nullable: true })
    user: User;
}