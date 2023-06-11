import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString, IsUUID } from "class-validator";
import { OrderStatus, OrderableType } from "../interface/order.interface";

export class BaseOrderDto {
    @ApiProperty()
    @IsUUID()
    id: string;

    @ApiProperty()
    @IsString()
    note: string;

    @ApiProperty({
        enum: OrderStatus,
        default: OrderStatus.Pending
    })
    @IsEnum(OrderStatus)
    status: OrderStatus;

    @ApiProperty({
        enum: OrderableType,
        default: OrderableType.Book,
        description: 'Type Of the Entity',
    })
    @IsEnum(OrderableType)
    entityType: OrderableType;

    @ApiProperty({
        description: 'UUID Of the Entity'
    })
    @IsUUID()
    entityId: string;
}