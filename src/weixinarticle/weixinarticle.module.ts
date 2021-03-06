import { Module } from '@nestjs/common';
import { WeixinarticleController } from './weixinarticle.controller';
import { WeixinarticleService } from './weixinarticle.service';

import { MongooseModule } from '@nestjs/mongoose';
import { WeiXinArticle, OfficialAccounts } from './schema/weixinarticle.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'weixinarticle', schema: WeiXinArticle }]),
    MongooseModule.forFeature([{ name: 'officialaccounts', schema: OfficialAccounts }])
  ],
  controllers: [WeixinarticleController],
  providers: [WeixinarticleService]
})
export class WeixinarticleModule {}
