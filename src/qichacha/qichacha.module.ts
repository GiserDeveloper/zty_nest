import { Module } from '@nestjs/common';
import { QichachaService } from './qichacha.service';
import { QichachaController } from './qichacha.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { QiChaChaSchema } from './schema/qichacha.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'QiChaCha', schema: QiChaChaSchema }]),
        MongooseModule.forFeature([{ name: 'OriginInforData', schema: QiChaChaSchema}])
    ],
    providers: [QichachaService],
    controllers: [QichachaController]
})
export class QichachaModule {}
