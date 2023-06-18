import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { PaymentStatus } from "../interface/payment.interface";
import { PaymentDriverType } from "../interface/payment-driver.interface";

export class BasePaymentDto {
    @ApiProperty()
    @IsUUID()
    id: string;

    @ApiProperty({
        description: 'Type Of Payment Driver',
        enum: PaymentDriverType
    })
    @IsEnum(PaymentDriverType)
    driver: PaymentDriverType;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    authority: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    tracking: string;

    @ApiProperty({
        type: PaymentStatus,
        default: PaymentStatus.Pending
    })
    @IsEnum(PaymentStatus)
    status: PaymentStatus;

    @ApiProperty({
        description: 'UUID Of the Order'
    })
    @IsUUID()
    order: string;
}