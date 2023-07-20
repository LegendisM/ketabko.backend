import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BookSectionDocumentService } from '../service/book-section-document.service';

@ApiTags('Book Section Documents')
@Controller({
    path: '/book-section-documents',
    version: '1'
})
export class BookSectionDocumentController {
    constructor(
        private bookSectionDocumentService: BookSectionDocumentService
    ) { }
}
