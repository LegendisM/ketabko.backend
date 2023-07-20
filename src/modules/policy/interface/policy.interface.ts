import { InferSubjects } from "@casl/ability";
import { Author } from "src/modules/author/entity/author.entity";
import { BookSectionData } from "src/modules/book/entity/book-section-document.entity";
import { Book } from "src/modules/book/entity/book.entity";
import { Category } from "src/modules/category/entity/category.entity";
import { Order } from "src/modules/order/entity/order.entity";
import { Payment } from "src/modules/payment/entity/payment.entity";
import { StorageFile } from "src/modules/storage/entity/storage-file.entity";
import { User } from "src/modules/user/entity/user.entity";

export type PolicySubjects = InferSubjects<
    typeof User | typeof Order | typeof Payment | typeof Book | typeof Category | typeof Comment | typeof StorageFile | typeof Author | typeof BookSectionData
> | 'User' | 'Order' | 'Payment' | 'Book' | 'Category' | 'Comment' | 'StorageFile' | 'Author' | 'BookSectionData' | 'all';

export enum PolicyAction {
    Manage = 'manage',
    Create = 'create',
    Read = 'read',
    Update = 'update',
    Delete = 'delete'
}