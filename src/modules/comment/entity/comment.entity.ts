import { UserEntity } from "./../../../modules/user/entity/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { CommentableType } from "../interface/comment.interface";

@Entity({
    name: "comment",
})
export class CommentEntity {
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

    @ManyToOne(() => UserEntity, (user) => user.comments, { onDelete: 'CASCADE' })
    user: UserEntity;

    @RelationId((comment: CommentEntity) => comment.user)
    userId: string;
}