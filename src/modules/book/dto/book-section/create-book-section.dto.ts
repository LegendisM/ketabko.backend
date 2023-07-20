import { PickType } from "@nestjs/swagger";
import { BaseBookSectionDto } from "./base-book-section.dto";

export class CreateBookSectionDto extends PickType(
    BaseBookSectionDto,
    ['title', 'fields', 'book']
) { }