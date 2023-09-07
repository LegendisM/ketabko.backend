import { UserEntity } from "./../../user/entity/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { StorageDriver, StorageFileType } from "../interface/storage.interface";

@Entity({
    name: "storage_file",
})
export class StorageFileEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    detail: string;

    @Column({
        type: 'enum',
        enum: StorageFileType,
        default: StorageFileType.Custom
    })
    type: StorageFileType;

    @Column()
    mime: string;

    @Column()
    size: number;

    @Column()
    path: string;

    @Column({
        type: 'enum',
        enum: StorageDriver,
        default: StorageDriver.Local
    })
    driver: StorageDriver;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => UserEntity, (user) => user.files, { onDelete: 'CASCADE', nullable: true })
    user: UserEntity;

    @RelationId((storageFile: StorageFileEntity) => storageFile.user)
    userId: string;
}