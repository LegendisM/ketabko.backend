import { PickType } from "@nestjs/swagger";
import { BaseBookSectionDocumentDto } from "./base-book-section-document.dto";

export class CreateBookSectionDocumentDto extends PickType(
    BaseBookSectionDocumentDto,
    ['values', 'section']
) { }