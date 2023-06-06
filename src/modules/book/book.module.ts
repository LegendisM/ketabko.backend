import { Module } from '@nestjs/common';
import { BookController } from './controller/book.controller';
import { BookService } from './service/book.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entity/book.entity';
import { BookOrder } from './entity/book-order.entity';
import { BookForm } from './entity/book-form.entity';
import { BookFormItem, BookFormItemMapping } from './entity/book-form-item.entity';
import { BookComment } from './entity/book-comment.entity';
import { BookCategory, BookCategoryMapping } from './entity/book-category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Book,
      BookCategory,
      BookCategoryMapping,
      BookOrder,
      BookForm,
      BookFormItem,
      BookFormItemMapping,
      BookComment,
    ]),
  ],
  controllers: [
    BookController
  ],
  providers: [
    BookService
  ]
})
export class BookModule { }
