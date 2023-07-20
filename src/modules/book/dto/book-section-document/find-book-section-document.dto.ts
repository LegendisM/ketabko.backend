import { IntersectionType, PartialType, PickType } from "@nestjs/swagger";
import { BaseBookSectionDocumentDto } from "./base-book-section-document.dto";
import { PaginationDto } from "src/common/dto/pagination.dto";

export class FindBookSectionDocumentsDto extends IntersectionType(
    PickType(
        PartialType(
            BaseBookSectionDocumentDto
        ),
        ['section', 'user']
    ),
    IntersectionType(PaginationDto)
) { }