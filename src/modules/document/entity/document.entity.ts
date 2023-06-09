import { Form } from "src/modules/form/entity/form.entity";
import { User } from "src/modules/user/entity/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Document {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({
        type: 'simple-json',
        transformer: {
            from: (value) => JSON.parse(value),
            to: (value) => JSON.stringify(value)
        }
    })
    value: Object;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User, (user) => user.documents, { onDelete: 'CASCADE' })
    user: User;

    @ManyToOne(() => Form, (form) => form.documents, { onDelete: 'CASCADE' })
    form: Form;
}