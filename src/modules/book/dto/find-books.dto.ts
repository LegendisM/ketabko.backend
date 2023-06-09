import { IntersectionType, PartialType, PickType } from "@nestjs/swagger";
import { BaseBookDto } from "./base-book.dto";
import { PaginationDto } from "src/common/dto/pagination.dto";

export class FindBooksDto extends IntersectionType(
    PickType(
        BaseBookDto,
        ['title', 'description']
    ),
    PartialType(PaginationDto)
) { }