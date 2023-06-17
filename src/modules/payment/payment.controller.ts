import { Controller, Get, Post, Delete, Param, Body, Query } from '@nestjs/common';
import { PaymentService } from './service/payment.service';
import { Roles } from '../user/decorator/role.decorator';
import { Role } from '../user/interface/role.interface';
import { Auth } from '../auth/decorator/auth.decorator';
import { IPagination } from 'src/common/interface/pagination.interface';
import { Payment } from './entity/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { CurrentUser } from '../user/decorator/user.decorator';
import { User } from '../user/entity/user.entity';
import { FindPaymentsDto } from './dto/find-payment.dto';
import { PaymentAdapterService } from './service/payment-adapter.service';

@Controller({
    path: '/payments',
    version: '1'
})
@Auth()
export class PaymentController {
    constructor(
        private paymentService: PaymentService,
        private paymentAdapterService: PaymentAdapterService
    ) { }

    @Get('/')
    @Roles(Role.Admin)
    async getAllPayments(@Query() findDto: FindPaymentsDto): Promise<IPagination<Payment>> {
        return await this.paymentService.findAll(findDto);
    }

    @Get('/me')
    async getUserPayments(@CurrentUser() user: User): Promise<Payment[]> {
        return await this.paymentService.findAllByUser(user);
    }

    @Get('/pay/:id')
    async startPayment(
        @Param('id') id: string,
        @CurrentUser() user: User
    ): Promise<string> {
        // TODO: check policy to this payment from this user or not
        return await this.paymentAdapterService.start(id);
    }

    @Get('/callback')
    async onPaymentCallback() {
        // return await this.paymentDriverService.process
        // tODO: find order with this authority and if he in status processing can be handle and call verify
    }

    @Post('/')
    async createPayment(
        @Body() createDto: CreatePaymentDto,
        @CurrentUser() user: User
    ): Promise<Payment> {
        return await this.paymentService.create(createDto, user);
    }

    @Delete('/:id')
    @Roles(Role.Admin)
    async removePayment(@Param('id') id: string) {
        await this.paymentService.remove(id);
    }
}
