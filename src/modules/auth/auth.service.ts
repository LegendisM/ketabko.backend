import bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { IAuthJwt, IAuthResult } from './interface/auth.interface';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    generateToken(payload: IAuthJwt): string {
        return this.jwtService.sign(payload);
    }

    async signup(authDto: AuthDto): Promise<IAuthResult> {
        let token = '', message = '', state = false;
        let user = await this.userService.findOne({ username: authDto.username });

        if (!user) {
            user = await this.userService.create({
                username: authDto.username,
                password: bcrypt.hashSync(authDto.password, 6)
            });
            token = this.generateToken({ id: user.id, username: user.username });
            message = 'signup_success';
            state = true;
        } else {
            message = 'already_username_used';
        }

        return { state, token, message }
    }

    async signin(authDto: AuthDto): Promise<IAuthResult> {
        let token = '', message = '', state = false;
        let user = await this.userService.findOne({ username: authDto.username });

        if (user && bcrypt.compareSync(authDto.password, user.password)) {
            token = this.generateToken({ id: user.id, username: user.username });
            message = 'signin_success';
            state = true;
        } else {
            message = 'invalid_information';
        }

        return { state, token, message }
    }
}
