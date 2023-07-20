import { BookSectionFieldType } from "../interface/book-field.interface";

export class BookSectionField {
    type: BookSectionFieldType;
    index: number;
    identifier: string;
    placeholder: string;
    default: string;
}