import { IntersectionType } from "@nestjs/swagger";
import { CreateCategoryDto } from "./create-category.dto";

export class UpdateCategoryDto extends IntersectionType(CreateCategoryDto) { }