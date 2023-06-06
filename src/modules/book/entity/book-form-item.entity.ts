import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BookForm } from "./book-form.entity";
import { User } from "src/modules/user/entity/user.entity";

@Entity({ name: 'book_form_items' })
export class BookFormItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @Column()
    helper: string;

    @ManyToOne(() => BookForm, (bookForm) => bookForm.items)
    form: BookForm;

    @OneToMany(() => BookFormItemMapping, (bookFormItemMapping) => bookFormItemMapping.item, { cascade: true })
    mappings: BookFormItemMapping[];
}

@Entity({ name: 'book_form_item_mappings' })
export class BookFormItemMapping {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    value: string;

    @ManyToOne(() => User, (user) => user.booksFormsItemsMappings)
    user: User;

    @ManyToOne(() => BookFormItem, (bookFormItem) => bookFormItem.mappings)
    item: BookFormItem;
}