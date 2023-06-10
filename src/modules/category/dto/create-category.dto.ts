import { PickType } from "@nestjs/swagger";
import { BaseCategoryDto } from "./base-category.dto";

export class CreateCategoryDto extends PickType(
    BaseCategoryDto,
    ['name']
) { }