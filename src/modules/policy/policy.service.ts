import { ForbiddenException, Injectable } from '@nestjs/common';
import { PolicyFactory } from './policy.factory';
import { Order } from '../order/entity/order.entity';
import { PolicyAction } from './interface/policy.interface';
import { User } from '../user/entity/user.entity';
import { Comment } from '../comment/entity/comment.entity';

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
            throw new ForbiddenException();
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
            throw new ForbiddenException();
        }
        return state;
    }
}
