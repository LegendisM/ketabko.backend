import { PickType } from "@nestjs/swagger";
import { BaseBookDto } from "./base-book.dto";

export class CreateBookDto extends PickType(
    BaseBookDto,
    ['title', 'description', 'price', 'cover', 'audio']
) { }