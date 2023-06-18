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
import { PolicyService } from '../policy/policy.service';
import { PolicyAction } from '../policy/interface/policy.interface';
import { PaymentDriverType } from './interface/payment-driver.interface';
import _ from 'lodash';
import { ApiConflictResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Payments')
@Controller({
    path: '/payments',
    version: '1'
})
@Auth()
export class PaymentController {
    constructor(
        private paymentService: PaymentService,
        private paymentAdapterService: PaymentAdapterService,
        private policyService: PolicyService
    ) { }

    @Get('/')
    @Roles(Role.Admin)
    @ApiOkResponse({
        description: 'Receive Array Of Payments With Paginate'
    })
    async getAllPayments(@Query() findDto: FindPaymentsDto): Promise<IPagination<Payment>> {
        return await this.paymentService.findAll(findDto);
    }

    @Get('/me')
    @ApiOkResponse({
        description: 'Receive Array Of User Payments'
    })
    async getUserPayments(@CurrentUser() user: User): Promise<Payment[]> {
        return await this.paymentService.findAllByUser(user);
    }

    @Get('/pay/:id')
    @ApiOkResponse({
        description: 'Payment Started Successfully'
    })
    @ApiNotFoundResponse({
        description: 'Payment Not Found'
    })
    @ApiForbiddenResponse({
        description: 'Invalid User Policy Access'
    })
    @ApiConflictResponse({
        description: 'Invalid Payment Stauts | Invalid Payment Driver Actions'
    })
    async startPayment(
        @Param('id') id: string,
        @CurrentUser() user: User
    ): Promise<string> {
        const payment = await this.paymentService.findById(id, true);
        this.policyService.forPayment(PolicyAction.Read, user, payment, true);
        return await this.paymentAdapterService.start(id);
    }

    @Get('/callback/:driver')
    @ApiOkResponse({
        description: 'Payment Result'
    })
    @ApiNotFoundResponse({
        description: 'Payment Driver Not Found'
    })
    @ApiConflictResponse({
        description: 'Payment Operation Failed'
    })
    async onPaymentCallback(
        @Param('driver') driver: PaymentDriverType,
        @Param() data: Record<string, string>
    ) {
        const result = this.paymentAdapterService.process(driver, _.omit(data, ['driver']));
        return result ? 'The purchase was made successfully' : 'The Payment Is Not Successfully, Try Again';
    }

    @Post('/')
    @ApiCreatedResponse({
        description: 'Payment Created Successfully'
    })
    @ApiNotFoundResponse({
        description: 'Order Not Found'
    })
    @ApiConflictResponse({
        description: 'Payment Already Exist For Order'
    })
    async createPayment(
        @Body() createDto: CreatePaymentDto,
        @CurrentUser() user: User
    ): Promise<Payment> {
        return await this.paymentService.create(createDto, user);
    }

    @Delete('/:id')
    @Roles(Role.Admin)
    @ApiOkResponse({
        description: 'Payment Removed Successfully'
    })
    @ApiNotFoundResponse({
        description: 'Payment Not Found'
    })
    async removePayment(@Param('id') id: string) {
        await this.paymentService.remove(id);
    }
}
