import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderEntity } from './entity/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from '../book/book.module';
import { DatabaseSource } from 'src/database/interface/database.interface';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity], DatabaseSource.Primary),
    BookModule
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService]
})
export class OrderModule { }
