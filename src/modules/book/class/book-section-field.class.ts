import { BookSectionFieldType } from "../interface/book-field.interface";

export class BookSectionField {
    type: BookSectionFieldType;
    identifier: string;
    label: string;
    placeholder: string;
    helper: string;
    default: string;
    group: string;
    row: number;
}