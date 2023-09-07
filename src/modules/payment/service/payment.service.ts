import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentEntity } from '../entity/payment.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { OrderService } from '../../order/order.service';
import { UserEntity } from '../../user/entity/user.entity';
import { IPagination } from './../../../common/interface/pagination.interface';
import { FindPaymentsDto } from '../dto/find-payment.dto';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { PaymentDriverType } from '../interface/payment-driver.interface';
import _ from 'lodash';
import { DatabaseSource } from 'src/database/interface/database.interface';

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(PaymentEntity, DatabaseSource.Primary) private paymentRepository: Repository<PaymentEntity>,
        private orderService: OrderService
    ) { }

    async create({ order, driver }: CreatePaymentDto, user: UserEntity): Promise<PaymentEntity> {
        const payment = this.paymentRepository.create({ driver, user });
        await this.orderService.validateForPayment(order, true);
        payment.order = await this.orderService.findById(order, true);
        return await this.paymentRepository.save(payment);
    }

    async findAll({ status, user, limit, page }: FindPaymentsDto, mergeCondition: boolean = false): Promise<IPagination<PaymentEntity>> {
        let where: FindOptionsWhere<PaymentEntity>[] = [
            (status) ?
                { status }
                : null,
            (user) ?
                { user: { id: user } }
                : null
        ].filter(condition => !!condition);
        where = mergeCondition ? [_.reduce(where, (previous, current) => _.merge(previous, current))] : where;
        const payments = await this.paymentRepository.find({
            where: where,
            skip: (page - 1) * limit,
            take: limit - 1
        });
        const paymentsCount = await this.paymentRepository.count({ where });
        return {
            items: payments,
            limit: limit,
            page: page,
            total: Math.ceil(paymentsCount / limit)
        }
    }

    async findAllByUser(user: UserEntity): Promise<PaymentEntity[]> {
        return await this.paymentRepository.findBy({ user: { id: user.id } });
    }

    async findById(id: string, exception: boolean = false): Promise<PaymentEntity> {
        const payment = await this.paymentRepository.findOneBy({ id });
        if (exception && !payment) {
            throw new NotFoundException('payment.invalid-id');
        }
        return payment;
    }

    async findByAuthority(authority: string, driver: PaymentDriverType, exception: boolean = false): Promise<PaymentEntity> {
        const payment = await this.paymentRepository.findOneBy({ authority, driver });
        if (exception && !payment) {
            throw new NotFoundException('payment.invalid-authority');
        }
        return payment;
    }

    async update(id: string, updateDto: Partial<PaymentEntity>): Promise<PaymentEntity> {
        const payment = await this.findById(id, true);
        Object.assign(payment, updateDto);
        return await this.paymentRepository.save(payment);
    }

    async remove(id: string): Promise<PaymentEntity> {
        const payment = await this.findById(id, true);
        return await this.paymentRepository.remove(payment);
    }
}
