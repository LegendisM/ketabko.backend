import { Injectable } from "@nestjs/common";
import { User } from "../user/entity/user.entity";
import { AbilityBuilder, PureAbility, createMongoAbility } from "@casl/ability";
import { PolicyAction, PolicySubjects } from "./interface/policy.interface";
import { Role } from "../user/interface/role.interface";

@Injectable()
export class PolicyFactory {
    userAbility(user: User) {
        const { can, cannot, build } = new AbilityBuilder<PureAbility<[PolicyAction, PolicySubjects]>>(
            createMongoAbility
        );

        can(PolicyAction.Read, 'Comment');
        can([PolicyAction.Delete], 'StorageFile', { user: user.id });
        can([PolicyAction.Update, PolicyAction.Delete], 'Comment', { user: user.id });
        can([PolicyAction.Read, PolicyAction.Update], 'Order', { user: user.id });

        if (user.roles.includes(Role.Moderator)) {
            can(PolicyAction.Manage, 'all');
        }

        if (user.roles.includes(Role.Admin)) {
            can(PolicyAction.Manage, 'all');
        }

        return build();
    }
}