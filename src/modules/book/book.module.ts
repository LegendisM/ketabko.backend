import { Module } from '@nestjs/common';
import { BookController } from './controller/book.controller';
import { BookService } from './service/book.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entity/book.entity';
import { BookForm } from './entity/book-form.entity';
import { BookFormItem, BookFormItemMapping } from './entity/book-form-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Book,
      BookForm,
      BookFormItem,
      BookFormItemMapping,
    ]),
  ],
  controllers: [
    BookController
  ],
  providers: [
    BookService
  ],
})
export class BookModule { }
