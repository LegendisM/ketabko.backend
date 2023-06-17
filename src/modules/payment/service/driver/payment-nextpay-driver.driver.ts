import { Injectable } from "@nestjs/common";
import { Payment } from "../../entity/payment.entity";
import { PaymentDriver } from "../../classes/payment-driver.class";
import { IPaymentRequest, IPaymentVerify } from "../../interface/payment.interface";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class PaymentNextpayDriver extends PaymentDriver {
    constructor(
        private httpService: HttpService
    ) {
        super();
    }

    async request(payment: Payment): Promise<IPaymentRequest> {
        return { authority: '', url: '' };
    }

    async verify(): Promise<IPaymentVerify> {
        return { state: true, code: 100 };
    }
}