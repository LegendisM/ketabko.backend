import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { FormItemType } from "../interface/form-item.interface";

@Entity({ name: 'book_form_items' })
export class BookFormItem {
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