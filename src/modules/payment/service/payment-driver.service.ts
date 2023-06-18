import { Injectable, NotFoundException } from "@nestjs/common";
import { PaymentDriver } from "../classes/payment-driver.class";
import { PaymentDriverType } from "../interface/payment-driver.interface";
import { PaymentZarinpalDriver } from "./driver/payment-zarinpal-driver.driver";
import { PaymentNextpayDriver } from "./driver/payment-nextpay-driver.driver";

@Injectable()
export class PaymentDriverService {
    constructor(
        private paymentZarinpalDriver: PaymentZarinpalDriver,
        private paymentNextpayDriver: PaymentNextpayDriver
    ) { }

    find(type: PaymentDriverType): PaymentDriver {
        let driver: PaymentDriver;
        switch (type) {
            case PaymentDriverType.Zarinpal:
                driver = this.paymentZarinpalDriver;
                break;
            case PaymentDriverType.Nextpay:
                driver = this.paymentNextpayDriver;
                break;
            default:
                throw new NotFoundException('payment.invalid-payment-driver');
                break;
        }
        return driver;
    }
}