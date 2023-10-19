import { readFileSync } from "fs";
import { parse } from "dotenv";
import { DataSource } from "typeorm";
import { UserEntity } from "./../../modules/user/entity/user.entity";
import { StorageFileEntity } from "./../../modules/storage/entity/storage-file.entity";
import { OrderEntity } from "./../../modules/order/entity/order.entity";
import { PaymentEntity } from "./../../modules/payment/entity/payment.entity";
import { CategoryEntity } from "./../../modules/category/entity/category.entity";
import { CommentEntity } from "./../../modules/comment/entity/comment.entity";
import { BookEntity } from "./../../modules/book/entity/book.entity";
import { BookSectionEntity } from "./../../modules/book/entity/book-section.entity";
import { BookSectionDocumentEntity } from "./../../modules/book/entity/book-section-document.entity";
import { AuthorEntity } from "./../../modules/author/entity/author.entity";

const config = parse(readFileSync('.env'));

export const PrimaryDataSource = new DataSource({
    type: 'postgres',
    host: config.PRIMARY_DB_HOST,
    port: +config.PRIMARY_DB_PORT,
    database: config.PRIMARY_DB_NAME,
    username: config.PRIMARY_DB_USERNAME,
    password: config.PRIMARY_DB_PASSWORD,
    entities: [
        UserEntity,
        StorageFileEntity,
        OrderEntity,
        PaymentEntity,
        CategoryEntity,
        CommentEntity,
        AuthorEntity,
        BookEntity,
        BookSectionEntity,
        BookSectionDocumentEntity,
    ],
    synchronize: config.NODE_ENV == "development",
    migrations: [`${__dirname}/migration/*{.ts,.js}`],
});