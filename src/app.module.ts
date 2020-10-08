import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config'
import { NoticeModule } from './notice/notice.module';
import { LayerModule } from './layer/layer.module';
import { MarkerModule } from './marker/marker.module';
import { MapModule } from './map/map.module';
import { CounterModule } from './counter/counter.module';
import { TeamModule } from './team/team.module';
import { TeamuserModule } from './teamuser/teamuser.module';
import { SettingModule } from './setting/setting.module';
import { QichachaController } from './qichacha/qichacha.controller';
import { QichachaService } from './qichacha/qichacha.service';
import { QichachaModule } from './qichacha/qichacha.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/zty',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
    }), UserModule, RoleModule, AuthModule, 
    ConfigModule.forRoot({
      isGlobal: true
    }), NoticeModule, LayerModule, MarkerModule, MapModule, CounterModule, TeamModule, TeamuserModule, SettingModule, QichachaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
