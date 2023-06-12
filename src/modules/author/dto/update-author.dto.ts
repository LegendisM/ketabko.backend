import { IntersectionType } from "@nestjs/swagger";
import { CreateAuthorDto } from "./create-author.dto";

export class UpdateAuthorDto extends IntersectionType(CreateAuthorDto) { }