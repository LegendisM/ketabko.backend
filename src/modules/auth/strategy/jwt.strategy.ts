import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { UserService } from "../../user/user.service";
import { IAuthJwt } from "../interface/auth.interface";
import { User } from "../../user/entity/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private configService: ConfigService,
        private userSerivce: UserService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET'),
        });
    }

    async validate(payload: IAuthJwt): Promise<User> {
        const user = await this.userSerivce.findById(payload.id);
        if (!user) {
            throw new UnauthorizedException('auth.unauthorized');
        }
        return user;
    }
}