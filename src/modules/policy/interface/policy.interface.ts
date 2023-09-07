import { InferSubjects } from "@casl/ability";
import { AuthorEntity } from "./../../author/entity/author.entity";
import { BookSectionDocumentEntity } from "./../../book/entity/book-section-document.entity";
import { BookEntity } from "./../../book/entity/book.entity";
import { CategoryEntity } from "./../../category/entity/category.entity";
import { OrderEntity } from "./../../order/entity/order.entity";
import { PaymentEntity } from "./../../payment/entity/payment.entity";
import { StorageFileEntity } from "./../../storage/entity/storage-file.entity";
import { UserEntity } from "./../../user/entity/user.entity";
import { CommentEntity } from "src/modules/comment/entity/comment.entity";
import { BookSectionEntity } from "src/modules/book/entity/book-section.entity";

export type PolicySubjects = InferSubjects<
    typeof UserEntity | typeof OrderEntity | typeof PaymentEntity | typeof BookEntity | typeof CategoryEntity | typeof CommentEntity | typeof StorageFileEntity | typeof AuthorEntity | typeof BookSectionEntity | typeof BookSectionDocumentEntity
> | 'UserEntity' | 'OrderEntity' | 'PaymentEntity' | 'BookEntity' | 'CategoryEntity' | 'CommentEntity' | 'StorageFileEntity' | 'AuthorEntity' | 'BookSectionEntity' | 'BookSectionDocumentEntity' | 'all';

export enum PolicyAction {
    Manage = 'manage',
    Create = 'create',
    Read = 'read',
    Update = 'update',
    Delete = 'delete'
}