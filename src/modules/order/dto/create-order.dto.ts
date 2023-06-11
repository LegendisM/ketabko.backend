import { PickType } from "@nestjs/swagger";
import { BaseOrderDto } from "./base-order.dto";

export class CreateOrderDto extends PickType(
    BaseOrderDto,
    ['product']
) { }