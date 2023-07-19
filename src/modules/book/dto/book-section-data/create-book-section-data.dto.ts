import { PickType } from "@nestjs/swagger";
import { BaseBookSectionDataDto } from "./base-book-section-data.dto";

export class CreateBookSectionDataDto extends PickType(
    BaseBookSectionDataDto,
    ['value', 'section']
) { }