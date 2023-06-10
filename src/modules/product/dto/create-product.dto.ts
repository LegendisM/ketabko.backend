import { PickType } from "@nestjs/swagger";
import { BaseProductDto } from "./base-product.dto";

export class CreateProductDto extends PickType(
    BaseProductDto,
    ['title', 'description', 'price', 'entityType', 'entityId', 'cover']
) { }