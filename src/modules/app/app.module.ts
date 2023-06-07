import path from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { HeaderResolver, I18nModule } from 'nestjs-i18n';
import { AuthModule } from '../auth/auth.module';
import { BookModule } from '../book/book.module';
import { OrderModule } from '../order/order.module';

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
    BookModule,
    OrderModule,
  ],
})
export class AppModule { }
