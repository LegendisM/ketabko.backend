import { ConflictException, Injectable, OnModuleInit } from "@nestjs/common";
import { PaymentEntity } from "../../entity/payment.entity";
import { PaymentDriver } from "../../class/payment-driver.class";
import { IPaymentRequest, IPaymentVerify, PaymentStatus } from "../../interface/payment.interface";
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { firstValueFrom } from "rxjs";
import { PaymentDriverType } from "../../interface/payment-driver.interface";
import { PaymentService } from "../payment.service";

@Injectable()
export class PaymentNextpayDriver extends PaymentDriver implements OnModuleInit {
    type: PaymentDriverType = PaymentDriverType.Nextpay;
    config: {
        token: string;
        requestEndpoint: string;
        payEndpoint: string;
        verifyEndpoint: string;
        callbackEndpoint: string;
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
            token: this.configService.get('NEXTPAY_TOKEN'),
            requestEndpoint: this.configService.get('NEXTPAY_REQUEST_ENDPOINT'),
            verifyEndpoint: this.configService.get('NEXTPAY_VERIFY_ENDPOINT'),
            payEndpoint: this.configService.get('NEXTPAY_PAY_ENDPOINT'),
            callbackEndpoint: this.configService.get('PAYMENT_CALLBACK_ENDPOINT')
        }
    }

    async request(payment: PaymentEntity): Promise<IPaymentRequest> {
        const response = await firstValueFrom(
            this.httpService.post(
                this.config.requestEndpoint,
                {
                    api_key: this.config.token,
                    order_id: payment.order.id,
                    amount: payment.order.price,
                    currency: 'IRR',
                    callback_uri: `${this.config.callbackEndpoint}${this.type}`
                }
            )
        ).catch(() => {
            throw new ConflictException('payment.api-service-unavailable')
        });

        const { code, trans_id } = response.data;
        if (code != -1) {
            throw new ConflictException('payment.api-service-trouble');
        }

        return { authority: trans_id, url: `${this.config.payEndpoint}${trans_id}` };
    }

    async verify({ trans_id }: Record<string, string>): Promise<IPaymentVerify> {
        const payment = await this.paymentService.findByAuthority(trans_id, this.type, true);
        if (payment.status == PaymentStatus.Processing) {
            const response = await firstValueFrom(
                this.httpService.post(
                    this.config.verifyEndpoint,
                    {
                        api_key: this.config.token,
                        trans_id: trans_id,
                        amount: payment.order.price,
                        currency: 'IRR'
                    }
                )
            );
            const { code, Shaparak_Ref_Id } = response.data;
            return { state: (code == 0), code: code, paymentId: payment.id, tracking: Shaparak_Ref_Id };
        } else {
            throw new ConflictException('payment.operation-failed');
        }
    }
}