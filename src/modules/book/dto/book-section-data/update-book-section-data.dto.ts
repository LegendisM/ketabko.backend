import { PickType } from "@nestjs/swagger";
import { BaseBookSectionDataDto } from "./base-book-section-data.dto";

export class UpdateBookSectionDataDto extends PickType(
    BaseBookSectionDataDto,
    ['value']
) { }