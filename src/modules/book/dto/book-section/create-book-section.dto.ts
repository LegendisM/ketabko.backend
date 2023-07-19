import { PickType } from "@nestjs/swagger";
import { BaseBookSectionkDto } from "./base-book-section.dto";

export class CreateBookSectionDto extends PickType(
    BaseBookSectionkDto,
    ['title', 'fields']
) { }