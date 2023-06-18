import { Module } from '@nestjs/common';
import { PaymentService } from './service/payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entity/payment.entity';
import { OrderModule } from '../order/order.module';
import { HttpModule } from '@nestjs/axios';
import { PaymentAdapterService } from './service/payment-adapter.service';
import { PaymentDriverService } from './service/payment-driver.service';
import { PaymentZarinpalDriver } from './service/driver/payment-zarinpal-driver.driver';
import { PaymentNextpayDriver } from './service/driver/payment-nextpay-driver.driver';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment]),
    OrderModule,
    HttpModule
  ],
  providers: [
    PaymentService,
    PaymentAdapterService,
    PaymentDriverService,
    PaymentZarinpalDriver,
    PaymentNextpayDriver
  ],
  controllers: [PaymentController],
  exports: [PaymentService]
})
export class PaymentModule { }
