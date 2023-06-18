import { Payment } from "../entity/payment.entity";
import { PaymentDriverType } from "../interface/payment-driver.interface";
import { IPaymentRequest, IPaymentVerify } from "../interface/payment.interface";

export abstract class PaymentDriver {
    abstract type: PaymentDriverType;
    abstract config: {
        token: string,
        requestEndpoint: string,
        payEndpoint: string,
        verifyEndpoint: string,
        callbackEndpoint: string
    };
    abstract request(payment: Payment): Promise<IPaymentRequest>;
    abstract verify(data: Record<string, string>): Promise<IPaymentVerify>;
}