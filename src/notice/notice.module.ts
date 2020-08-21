import { Module } from '@nestjs/common';
import { NoticeController } from './notice.controller';
import { NoticeService } from './notice.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NoticeSchema } from './schema/notice.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Liaoning', schema: NoticeSchema }])
  ],
  controllers: [NoticeController],
  providers: [NoticeService]
})
export class NoticeModule {}
