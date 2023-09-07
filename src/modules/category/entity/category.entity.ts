import slugify from "slugify";
import { AfterInsert, AfterUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "category",
})
export class CategoryEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    name: string;

    @Column({ unique: true })
    slug: string;

    @AfterInsert()
    @AfterUpdate()
    normalizeField() {
        this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1);
        this.slug = slugify(this.name, { lower: true });
    }
}