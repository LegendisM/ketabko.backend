import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { Auth } from "./../../auth/decorator/auth.decorator";
import { RolesGuard } from "../guard/roles.guard";
import { Role } from "../interface/role.interface";

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => {
    return applyDecorators(
        SetMetadata(ROLES_KEY, roles),
        Auth(),
        UseGuards(RolesGuard)
    );
}