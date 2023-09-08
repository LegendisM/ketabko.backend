import { Injectable, OnModuleInit, ConflictException } from "@nestjs/common";
import { PaymentDriver } from "../../class/payment-driver.class";
import { PaymentEntity } from "../../entity/payment.entity";
import { IPaymentRequest, IPaymentVerify, PaymentStatus } from "../../interface/payment.interface";
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { firstValueFrom } from "rxjs";
import { PaymentDriverType } from "../../interface/payment-driver.interface";
import { PaymentService } from "../payment.service";

@Injectable()
export class PaymentZarinpalDriver extends PaymentDriver implements OnModuleInit {
    type: PaymentDriverType = PaymentDriverType.Zarinpal;
    config: {
        token: string;
        requestEndpoint: string;
        payEndpoint: string,
        verifyEndpoint: string;
        callbackEndpoint: string
    };

    constructor(
        private httpService: HttpService,
        private configService: ConfigService,
        private paymentService: PaymentService
    ) {
        super();
    }

    onModuleInit() {
        this.config = {
            token: this.configService.get('ZARINPAL_TOKEN'),
            requestEndpoint: this.configService.get('ZARINPAL_REQUEST_ENDPOINT'),
            verifyEndpoint: this.configService.get('ZARINPAL_VERIFY_ENDPOINT'),
            payEndpoint: this.configService.get('ZARINPAL_PAY_ENDPOINT'),
            callbackEndpoint: this.configService.get('PAYMENT_CALLBACK_ENDPOINT')
        };
    }

    async request(payment: PaymentEntity): Promise<IPaymentRequest> {
        const response = await firstValueFrom(
            this.httpService.post(
                this.config.requestEndpoint,
                {
                    merchant_id: this.config.token,
                    amount: payment.order.price,
                    description: "Transaction",
                    callback_url: `${this.config.callbackEndpoint}${this.type}`
                }
            )
        ).catch(() => {
            throw new ConflictException('payment.api-service-unavailable');
        });

        const { code, authority } = response.data;
        if (code != 100) {
            throw new ConflictException('payment.api-service-trouble');
        }

        return { authority, url: `${this.config.payEndpoint}${authority}` };
    }

    async verify({ Authority, Status }: Record<string, string>): Promise<IPaymentVerify> {
        if (Status != "OK") {
            throw new ConflictException('payment.operation-failed');
        }

        const payment = await this.paymentService.findByAuthority(Authority, this.type, true);
        if (payment.status == PaymentStatus.Processing) {
            const response = await firstValueFrom(
                this.httpService.post(
                    this.config.verifyEndpoint,
                    {
                        merchant_id: this.config.token,
                        amount: payment.order.price,
                        authority: Authority
                    }
                )
            );
            const { code, ref_id } = response.data;
            return { state: (code == 100), code: code, paymentId: payment.id, tracking: ref_id };
        } else {
            throw new ConflictException('payment.operation-failed');
        }
    }
}