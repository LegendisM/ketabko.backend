import { PickType } from "@nestjs/swagger";
import { BaseBookSectionDto } from "./base-book-section.dto";

export class UpdateBookSectionDto extends PickType(
    BaseBookSectionDto,
    ['title', 'fields']
) { }