import path from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeaderResolver, I18nModule } from 'nestjs-i18n';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { StorageModule } from '../storage/storage.module';
import { OrderModule } from '../order/order.module';
import { BookModule } from '../book/book.module';
import { CategoryModule } from '../category/category.module';
import { CommentModule } from '../comment/comment.module';
import { AuthorModule } from '../author/author.module';
import { PolicyModule } from '../policy/policy.module';
import { PaymentModule } from '../payment/payment.module';
import { PrimaryDataSource } from 'src/database/primary/primary.data-source';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'fa',
      loaderOptions: {
        path: path.join(__dirname, '../../i18n/')
      },
      resolvers: [HeaderResolver]
    }),
    TypeOrmModule.forRootAsync({
      name: "primary",
      dataSourceFactory: async () => {
        return await PrimaryDataSource;
      },
    }),
    UserModule,
    AuthModule,
    PolicyModule,
    StorageModule,
    OrderModule,
    PaymentModule,
    AuthorModule,
    BookModule,
    CategoryModule,
    CommentModule
  ],
})
export class AppModule { }
