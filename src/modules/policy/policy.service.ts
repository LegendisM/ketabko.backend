import { ForbiddenException, Injectable } from '@nestjs/common';
import { PolicyFactory } from './policy.factory';
import { Order } from '../order/entity/order.entity';
import { PolicyAction } from './interface/policy.interface';
import { User } from '../user/entity/user.entity';
import { Comment } from '../comment/entity/comment.entity';
import { Payment } from '../payment/entity/payment.entity';
import { BookSectionDocument } from '../book/entity/book-section-document.entity';

@Injectable()
export class PolicyService {
    constructor(
        private policyFactory: PolicyFactory
    ) { }

    forOrder(
        action: PolicyAction,
        user: User,
        order: Order,
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
        user: User,
        payment: Payment,
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
        user: User,
        comment: Comment,
        exception: boolean
    ): boolean {
        // @ts-ignore
        const state = this.policyFactory.userAbility(user).can(action, comment);
        if (exception && !state) {
            throw new ForbiddenException('policy.comment-forbidden');
        }
        return state;
    }

    forBookSectionDocument(
        action: PolicyAction,
        user: User,
        document: BookSectionDocument,
        exception: boolean
    ): boolean {
        const state = this.policyFactory.userAbility(user).can(action, document);
        if (exception && !state) {
            throw new ForbiddenException(`policy.book-section-document-forbidden`);
        }
        return state;
    }
}
