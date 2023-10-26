import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { I18n, I18nContext } from 'nestjs-i18n';
import { IAuthResult } from './interface/auth.interface';

@ApiTags('Auth')
@Controller({
    path: '/auth',
    version: '1'
})
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @Post('/signup')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        description: 'Receive AuthResult Object'
    })
    async signup(
        @Body() authDto: AuthDto,
        @I18n() i18n: I18nContext
    ): Promise<IAuthResult> {
        const { state, token, message } = await this.authService.signup(authDto);
        return {
            state,
            token,
            message: i18n.t(message)
        };
    }

    @Post('/signin')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        description: 'Receive AuthResult Object'
    })
    async signin(
        @Body() authDto: AuthDto,
        @I18n() i18n: I18nContext
    ): Promise<IAuthResult> {
        const { state, token, message } = await this.authService.signin(authDto);
        return {
            state,
            token,
            message: i18n.t(message)
        };
    }
}
