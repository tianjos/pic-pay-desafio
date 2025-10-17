import { BullModule } from "@nestjs/bullmq";
import { Module } from "@nestjs/common";
import { BullConfigService } from "./queue.config.service";

@Module({
    imports: [BullModule.forRootAsync({
        useClass: BullConfigService,
        inject: [BullConfigService]
    })]
})
export class QueueModule { }