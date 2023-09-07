import { Injectable } from "@nestjs/common";
import { UserEntity } from "../user/entity/user.entity";
import { AbilityBuilder, PureAbility, createMongoAbility } from "@casl/ability";
import { PolicyAction, PolicySubjects } from "./interface/policy.interface";
import { Role } from "../user/interface/role.interface";

export type AppAbility = PureAbility<[PolicyAction, PolicySubjects]>;

@Injectable()
export class PolicyFactory {
    userAbility(user: UserEntity) {
        const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

        can(PolicyAction.Read, 'CommentEntity');
        can([PolicyAction.Delete], 'StorageFileEntity', { userId: user.id });
        can([PolicyAction.Update, PolicyAction.Delete], 'CommentEntity', { userId: user.id });
        can([PolicyAction.Read, PolicyAction.Update], 'OrderEntity', { userId: user.id });
        can([PolicyAction.Read, PolicyAction.Update], 'PaymentEntity', { userId: user.id });
        can([PolicyAction.Read, PolicyAction.Update, PolicyAction.Delete], 'BookSectionDocumentEntity', { userId: user.id });

        if (user.roles.includes(Role.Moderator)) {
            can(PolicyAction.Manage, 'all');
        }

        if (user.roles.includes(Role.Admin)) {
            can(PolicyAction.Manage, 'all');
        }

        return build();
    }
}