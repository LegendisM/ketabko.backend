import { ForbiddenException, Injectable } from '@nestjs/common';
import { PolicyFactory } from './policy.factory';
import { OrderEntity } from '../order/entity/order.entity';
import { PolicyAction } from './interface/policy.interface';
import { UserEntity } from '../user/entity/user.entity';
import { CommentEntity } from '../comment/entity/comment.entity';
import { PaymentEntity } from '../payment/entity/payment.entity';
import { BookSectionDocumentEntity } from '../book/entity/book-section-document.entity';

@Injectable()
export class PolicyService {
    constructor(
        private policyFactory: PolicyFactory
    ) { }

    forOrder(
        action: PolicyAction,
        user: UserEntity,
        order: OrderEntity,
        exception: boolean
    ): boolean {
        const state = this.policyFactory.userAbility(user).can(action, order);
        if (exception && !state) {
            throw new ForbiddenException('policy.order-forbidden');
        }
        return state;
    }

    forPayment(
        action: PolicyAction,
        user: UserEntity,
        payment: PaymentEntity,
        exception: boolean
    ) {
        const state = this.policyFactory.userAbility(user).can(action, payment);
        if (exception && !state) {
            throw new ForbiddenException('policy.payment-forbidden');
        }
        return state;
    }

    forComment(
        action: PolicyAction,
        user: UserEntity,
        comment: CommentEntity,
        exception: boolean
    ): boolean {
        const state = this.policyFactory.userAbility(user).can(action, comment);
        if (exception && !state) {
            throw new ForbiddenException('policy.comment-forbidden');
        }
        return state;
    }

    forBookSectionDocument(
        action: PolicyAction,
        user: UserEntity,
        document: BookSectionDocumentEntity,
        exception: boolean
    ): boolean {
        const state = this.policyFactory.userAbility(user).can(action, document);
        if (exception && !state) {
            throw new ForbiddenException(`policy.book-section-document-forbidden`);
        }
        return state;
    }
}
