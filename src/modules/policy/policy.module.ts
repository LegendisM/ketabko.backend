import { Global, Module } from '@nestjs/common';
import { PolicyFactory } from './policy.factory';
import { PolicyService } from './policy.service';

@Global()
@Module({
    providers: [
        PolicyFactory,
        PolicyService
    ],
    exports: [PolicyService]
})
export class PolicyModule { }
