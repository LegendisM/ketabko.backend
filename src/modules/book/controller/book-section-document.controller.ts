import { Controller, Get, Post, Delete, Param, Body, Patch, ParseUUIDPipe, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BookSectionDocumentService } from '../service/book-section-document.service';
import { Roles } from './../../user/decorator/role.decorator';
import { Role } from './../../user/interface/role.interface';
import { Auth } from './../../auth/decorator/auth.decorator';
import { BookSectionDocumentEntity } from '../entity/book-section-document.entity';
import { IPagination } from './../../../common/interface/pagination.interface';
import { PaginationDto } from './../../../common/dto/pagination.dto';
import { CurrentUser } from './../../user/decorator/user.decorator';
import { UserEntity } from './../../user/entity/user.entity';
import { FindBookSectionDocumentsDto } from '../dto/book-section-document/find-book-section-document.dto';
import { CreateBookSectionDocumentDto } from '../dto/book-section-document/create-book-section-document.dto';
import { UpdateBookSectionDocumentDto } from '../dto/book-section-document/update-book-section-document.dto';
import { PolicyService } from './../../policy/policy.service';
import { PolicyAction } from './../../policy/interface/policy.interface';

@ApiTags('Book Section Documents')
@Controller({
    path: '/book-section-documents',
    version: '1'
})
@Auth()
export class BookSectionDocumentController {
    constructor(
        private bookSectionDocumentService: BookSectionDocumentService,
        private policyService: PolicyService
    ) { }

    @Get('/')
    @Roles(Role.Admin)
    @ApiOkResponse({
        description: 'Receive Array Of Documents With Paginate'
    })
    async getAllDocuments(@Query() findDto: FindBookSectionDocumentsDto): Promise<IPagination<BookSectionDocumentEntity>> {
        return await this.bookSectionDocumentService.findAll(findDto);
    }

    @Get('/me')
    @ApiOkResponse({
        description: 'Receive Array Of User Documents With Paginate'
    })
    async getUserDocuments(
        @Query() paginationDto: PaginationDto,
        @CurrentUser() user: UserEntity
    ): Promise<IPagination<BookSectionDocumentEntity>> {
        return await this.bookSectionDocumentService.findAll({ user: user.id, ...paginationDto }, true);
    }

    @Get('/me/section/:sectionId')
    @ApiOkResponse({
        description: 'Receive Array Of Section User Documents With Paginate'
    })
    async getSectionUserDocuments(
        @Param('sectionId', ParseUUIDPipe) sectionId: string,
        @Query() paginationDto: PaginationDto,
        @CurrentUser() user: UserEntity
    ): Promise<IPagination<BookSectionDocumentEntity>> {
        return await this.bookSectionDocumentService.findAll({ section: sectionId, user: user.id, ...paginationDto }, true);
    }

    @Get('/me/:id')
    @ApiOkResponse({
        description: 'Receive Document Instance'
    })
    @ApiNotFoundResponse({
        description: 'Document Not Found'
    })
    async getDocumentById(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: UserEntity): Promise<BookSectionDocumentEntity> {
        const document = await this.bookSectionDocumentService.findById(id, true);
        this.policyService.forBookSectionDocument(PolicyAction.Read, user, document, true);
        return document;
    }

    @Post('/me')
    @ApiCreatedResponse({
        description: 'Document Created Successfully'
    })
    @ApiNotFoundResponse({
        description: 'Section Not Found'
    })
    async createDocument(
        @Body() createDto: CreateBookSectionDocumentDto,
        @CurrentUser() user: UserEntity
    ): Promise<BookSectionDocumentEntity> {
        return await this.bookSectionDocumentService.create(createDto, user);
    }

    @Patch('/me/:id')
    @ApiOkResponse({
        description: 'Document Updated Successfully'
    })
    @ApiNotFoundResponse({
        description: 'Document Not Found'
    })
    async updateDocument(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateDto: UpdateBookSectionDocumentDto,
        @CurrentUser() user: UserEntity
    ) {
        const document = await this.bookSectionDocumentService.findById(id, true);
        this.policyService.forBookSectionDocument(PolicyAction.Update, user, document, true);
        return await this.bookSectionDocumentService.update(id, updateDto);
    }

    @Delete('/me/:id')
    @ApiOkResponse({
        description: 'Document Deleted Successfully'
    })
    @ApiNotFoundResponse({
        description: 'Document Not Found'
    })
    async removeDocument(
        @Param('id', ParseUUIDPipe) id: string,
        @CurrentUser() user: UserEntity
    ) {
        const document = await this.bookSectionDocumentService.findById(id, true);
        this.policyService.forBookSectionDocument(PolicyAction.Delete, user, document, true);
        return await this.bookSectionDocumentService.remove(id);
    }
}
