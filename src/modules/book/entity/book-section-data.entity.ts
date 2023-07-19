import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BookSection } from "./book-section.entity";
import { User } from "src/modules/user/entity/user.entity";

@Entity()
export class BookSectionData {
    @PrimaryGeneratedColumn()
    id: string;

    @Column('simple-json', {
        transformer: {
            from: (value) => JSON.parse(value),
            to: (value) => JSON.stringify(value)
        }
    })
    value: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => BookSection, (section) => section.datas, { onDelete: 'CASCADE' })
    section: BookSection;

    @ManyToOne(() => User, (user) => user.bookSectionDatas, { onDelete: 'CASCADE' })
    user: User;
}