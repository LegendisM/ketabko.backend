import path from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('PRIMARY_DB_HOST'),
        port: +configService.get('PRIMARY_DB_PORT'),
        database: configService.get('PRIMARY_DB_NAME'),
        username: configService.get('PRIMARY_DB_USERNAME'),
        password: configService.get('PRIMARY_DB_PASSWORD'),
        entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
        synchronize: configService.get('NODE_ENV') != 'production'
      }),
      inject: [ConfigService]
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
