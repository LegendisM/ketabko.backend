import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsUUID } from "class-validator";
import { OrderStatus } from "../interface/order.interface";

export class BaseOrderDto {
    @ApiProperty()
    @IsUUID()
    id: string;

    @ApiProperty({
        enum: OrderStatus
    })
    @IsEnum(OrderStatus)
    status: OrderStatus;
}