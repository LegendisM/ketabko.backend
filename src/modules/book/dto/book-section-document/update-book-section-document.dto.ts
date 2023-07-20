import { PickType } from "@nestjs/swagger";
import { BaseBookSectionDocumentDto } from "./base-book-section-document.dto";

export class UpdateBookSectionDocumentDto extends PickType(
    BaseBookSectionDocumentDto,
    ['value']
) { }