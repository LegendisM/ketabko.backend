import { PickType } from "@nestjs/swagger";
import { BaseAuthorDto } from "./base-author.dto";

export class CreateAuthorDto extends PickType(
    BaseAuthorDto,
    ['name', 'description', 'avatar']
) { }