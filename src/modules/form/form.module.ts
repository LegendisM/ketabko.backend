import { Module } from '@nestjs/common';
import { FormController } from './form.controller';
import { FormService } from './form.service';
import { Form } from './entity/form.entity';
import { FormItem } from './entity/form-item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Form, FormItem]),
  ],
  controllers: [FormController],
  providers: [FormService],
  exports: [FormService]
})
export class FormModule { }
