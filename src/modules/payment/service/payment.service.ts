import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from '../entity/payment.entity';
import { Repository } from 'typeorm';
import { OrderService } from '../../order/order.service';
import { User } from '../../user/entity/user.entity';
import { IPagination } from 'src/common/interface/pagination.interface';
import { FindPaymentsDto } from '../dto/find-payment.dto';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { PaymentDriverType } from '../interface/payment-driver.interface';

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(Payment) private paymentRepository: Repository<Payment>,
        private orderService: OrderService
    ) { }

    async create({ order, driver }: CreatePaymentDto, user: User): Promise<Payment> {
        const payment = this.paymentRepository.create({ driver, user });
        await this.orderService.validateForPayment(order, true);
        payment.order = await this.orderService.findById(order, true);
        return await this.paymentRepository.save(payment);
    }

    async findAll({ status, user, limit, page }: FindPaymentsDto): Promise<IPagination<Payment>> {
        const payments = await this.paymentRepository.find({
            where: [
                (status) ?
                    { status }
                    : null,
                (user) ?
                    { user: { id: user } }
                    : null,
            ],
            skip: (page - 1) * limit,
            take: limit - 1
        });
        const paymentsCount = await this.paymentRepository.count();
        return {
            items: payments,
            limit: limit,
            page: page,
            total: Math.ceil(paymentsCount / limit)
        }
    }

    async findAllByUser(user: User): Promise<Payment[]> {
        return await this.paymentRepository.findBy({ user: { id: user.id } });
    }

    async findById(id: string, exception: boolean = false): Promise<Payment> {
        const payment = await this.paymentRepository.findOneBy({ id });
        if (exception && !payment) {
            throw new NotFoundException('payment.invalid-id');
        }
        return payment;
    }

    async findByAuthority(authority: string, driver: PaymentDriverType, exception: boolean = false): Promise<Payment> {
        const payment = await this.paymentRepository.findOneBy({ authority, driver });
        if (exception && !payment) {
            throw new NotFoundException('payment.invalid-authority');
        }
        return payment;
    }

    async update(id: string, updateDto: Partial<Payment>): Promise<Payment> {
        const payment = await this.findById(id, true);
        Object.assign(payment, updateDto);
        return await this.paymentRepository.save(payment);
    }

    async remove(id: string): Promise<Payment> {
        const payment = await this.findById(id, true);
        return await this.paymentRepository.remove(payment);
    }
}
