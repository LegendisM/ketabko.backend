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
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '../../i18n/')
      },
      resolvers: [HeaderResolver]
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: +configService.get('POSTGRES_PORT'),
        database: configService.get('POSTGRES_DB'),
        username: configService.get('POSTGRES_USERNAME'),
        password: configService.get('POSTGRES_PASSWORD'),
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
