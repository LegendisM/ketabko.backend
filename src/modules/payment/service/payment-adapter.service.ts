import { ConflictException, Injectable } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { PaymentStatus } from "../interface/payment.interface";
import { PaymentDriverService } from "./payment-driver.service";
import { PaymentDriverType } from "../interface/payment-driver.interface";
import _ from "lodash";
import { OrderService } from "src/modules/order/order.service";
import { OrderStatus } from "src/modules/order/interface/order.interface";

@Injectable()
export class PaymentAdapterService {
    constructor(
        private paymentService: PaymentService,
        private paymentDriverService: PaymentDriverService,
        private orderService: OrderService
    ) { }

    async start(id: string): Promise<string> {
        const payment = await this.paymentService.findById(id, true);
        const paymentDriver = this.paymentDriverService.find(payment.driver);
        if (payment.status == PaymentStatus.Pending) {
            const { authority, url } = await paymentDriver.request(payment);
            await this.paymentService.update(payment.id, { status: PaymentStatus.Processing, authority });
            return url;
        } else {
            throw new ConflictException('payment.invalid-payment-pending-status');
        }
    }

    async process(driver: PaymentDriverType, data: Record<string, string>): Promise<boolean> {
        const paymentDriver = this.paymentDriverService.find(driver);
        const { state, code, paymentId, tracking } = await paymentDriver.verify(data);
        if (state) {
            const { order } = await this.paymentService.update(paymentId, { status: PaymentStatus.Complete, tracking });
            await this.orderService.update(order.id, { status: OrderStatus.Complete });
        } else {
            await this.paymentService.update(paymentId, { status: PaymentStatus.Fail });
        }
        return state;
    }
}