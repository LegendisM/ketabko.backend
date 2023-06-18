import { PickType } from "@nestjs/swagger";
import { BasePaymentDto } from "./base-payment.dto";

export class CreatePaymentDto extends PickType(
    BasePaymentDto,
    ['order', 'driver']
) { }