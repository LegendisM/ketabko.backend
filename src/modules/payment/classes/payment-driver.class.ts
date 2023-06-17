import { Payment } from "../entity/payment.entity";
import { IPaymentRequest, IPaymentVerify } from "../interface/payment.interface";

export abstract class PaymentDriver {
    abstract request(payment: Payment): Promise<IPaymentRequest>;
    abstract verify(): Promise<IPaymentVerify>;
}