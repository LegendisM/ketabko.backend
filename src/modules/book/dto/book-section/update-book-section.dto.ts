import { PickType } from "@nestjs/swagger";
import { BaseBookSectionkDto } from "./base-book-section.dto";

export class UpdateBookSectionDto extends PickType(
    BaseBookSectionkDto,
    ['title', 'fields']
) { }