import { Injectable } from "@nestjs/common";
import { User } from "../user/entity/user.entity";
import { AbilityBuilder, PureAbility, createMongoAbility } from "@casl/ability";
import { PolicyAction, PolicySubjects } from "./interface/policy.interface";
import { Role } from "../user/interface/role.interface";

export type AppAbility = PureAbility<[PolicyAction, PolicySubjects]>;

@Injectable()
export class PolicyFactory {
    userAbility(user: User) {
        const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

        can(PolicyAction.Read, 'Comment');
        can([PolicyAction.Delete], 'StorageFile', { userId: user.id });
        can([PolicyAction.Update, PolicyAction.Delete], 'Comment', { userId: user.id });
        can([PolicyAction.Read, PolicyAction.Update], 'Order', { userId: user.id });
        can([PolicyAction.Read, PolicyAction.Update], 'Payment', { userId: user.id });
        can([PolicyAction.Read, PolicyAction.Update, PolicyAction.Delete], 'BookSectionDocument', { userId: user.id });

        if (user.roles.includes(Role.Moderator)) {
            can(PolicyAction.Manage, 'all');
        }

        if (user.roles.includes(Role.Admin)) {
            can(PolicyAction.Manage, 'all');
        }

        return build();
    }
}