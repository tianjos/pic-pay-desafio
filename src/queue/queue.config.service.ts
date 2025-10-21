import { BullRootModuleOptions, SharedBullConfigurationFactory, } from "@nestjs/bullmq";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class BullConfigService implements SharedBullConfigurationFactory {
    constructor(private readonly configService: ConfigService) { }
    createSharedConfiguration(): Promise<BullRootModuleOptions> | BullRootModuleOptions {
        return {
            connection: {
                host: this.configService.get('REDIS_HOST'),
                port: this.configService.get('REDIS_PORT'),
            },
            defaultJobOptions: {
                attempts: 3,
                backoff: {
                    type: 'exponential',
                    delay: 5000,
                },
                removeOnComplete: true,
                removeOnFail: false,
            },
            prefix: 'pic-pay',
        }
    }
}