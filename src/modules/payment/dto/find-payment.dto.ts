import { ApiProperty, IntersectionType } from "@nestjs/swagger";
import { PaymentStatus } from "../interface/payment.interface";
import { IsEnum, IsOptional, IsUUID } from "class-validator";
import { PaginationDto } from "./../../../common/dto/pagination.dto";

export class FindPaymentsDto extends IntersectionType(PaginationDto) {
    @ApiProperty({
        required: false,
        enum: PaymentStatus,
        default: PaymentStatus.Pending,
        description: 'Filter By Status'
    })
    @IsEnum(PaymentStatus)
    @IsOptional()
    status: PaymentStatus;

    @ApiProperty({
        required: false,
        description: 'Filter By User With UUID'
    })
    @IsUUID()
    @IsOptional()
    user: string;
}