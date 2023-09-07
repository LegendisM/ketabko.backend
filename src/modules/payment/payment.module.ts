import { Module } from '@nestjs/common';
import { PaymentService } from './service/payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from './entity/payment.entity';
import { OrderModule } from '../order/order.module';
import { HttpModule } from '@nestjs/axios';
import { PaymentAdapterService } from './service/payment-adapter.service';
import { PaymentDriverService } from './service/payment-driver.service';
import { PaymentZarinpalDriver } from './service/driver/payment-zarinpal-driver.driver';
import { PaymentNextpayDriver } from './service/driver/payment-nextpay-driver.driver';
import { DatabaseSource } from 'src/database/interface/database.interface';

@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentEntity], DatabaseSource.Primary),
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
