import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { FormItemType } from "../interface/form-item.interface";

@Entity({ name: 'form_items' })
export class FormItem {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'enum',
        enum: FormItemType,
        default: FormItemType.Text
    })
    type: string;

    @Column()
    helper: string;
}