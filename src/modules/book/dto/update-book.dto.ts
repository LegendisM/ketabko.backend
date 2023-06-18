import { IntersectionType } from "@nestjs/swagger";
import { CreateBookDto } from "./create-book.dto";

export class UpdateBookDto extends IntersectionType(CreateBookDto) { }
