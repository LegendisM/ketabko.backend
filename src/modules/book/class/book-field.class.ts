import { BookFieldType } from "../interface/book-field.interface";

export class BookField {
    type: BookFieldType;
    identifier: string;
    placeholder: string;
    default: string;
}