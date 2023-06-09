import { User } from "src/modules/user/entity/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CommentableType } from "../interface/comment.interface";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    message: string;

    @Column({
        type: 'enum',
        enum: CommentableType,
        nullable: false
    })
    entityType: CommentableType;

    @Column({ type: 'uuid', nullable: false })
    entityId: string;

    @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
    user: User;
}