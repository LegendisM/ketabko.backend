import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { FormItemComponent } from "../interface/form-item.interface";
import { Form } from "./form.entity";

@Entity()
export class FormItem {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'enum',
        enum: FormItemComponent,
        default: FormItemComponent.Text
    })
    component: FormItemComponent;

    @Column()
    helper: string;

    @ManyToOne(() => Form, (form) => form.items, { onDelete: 'CASCADE' })
    form: Form;
}