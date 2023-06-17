import { Injectable } from "@nestjs/common";
import { PaymentDriver } from "../../classes/payment-driver.class";
import { Payment } from "../../entity/payment.entity";
import { IPaymentRequest, IPaymentVerify } from "../../interface/payment.interface";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class PaymentZarinpalDriver extends PaymentDriver {
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