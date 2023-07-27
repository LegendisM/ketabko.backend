import { User } from "src/modules/user/entity/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { StorageDriver, StorageFileType } from "../interface/storage.interface";

@Entity()
export class StorageFile {
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

    @ManyToOne(() => User, (user) => user.files, { onDelete: 'CASCADE', nullable: true })
    user: User;

    @RelationId((storageFile: StorageFile) => storageFile.user)
    userId: string;
}