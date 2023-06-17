import { ConflictException, Injectable } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { PaymentStatus } from "../interface/payment.interface";
import { PaymentDriverService } from "./payment-driver.service";

@Injectable()
export class PaymentAdapterService {
    constructor(
        private paymentService: PaymentService,
        private paymentDriverService: PaymentDriverService
    ) { }

    async start(id: string): Promise<string> {
        const payment = await this.paymentService.findById(id, true);
        const paymentDriver = await this.paymentDriverService.find(payment.driver)
        if (payment.status == PaymentStatus.Pending) {
            const { authority, url } = await paymentDriver.request(payment);
            await this.paymentService.update(payment.id, { status: PaymentStatus.Processing, authority });
            return url;
        } else {
            throw new ConflictException(`This Payment With Id ${id} Is Not Pending`);
        }
    }

    async process() { }
}