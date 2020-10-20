import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { TeamuserModule } from 'src/teamuser/teamuser.module';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { TeamuserService } from 'src/teamuser/teamuser.service';
import { MongooseModule } from '@nestjs/mongoose';
import {TeamuserSchema} from '../teamuser/schema/teamuser.schema'
import {TeamSchema} from '../team/schema/team.schema'
import { MapSchema} from '../map/schema/map.schema';

@Module({
  imports: [
    UserModule,
    PassportModule,
    TeamuserModule,
    MongooseModule.forFeature([{ name: 'Teamuser', schema: TeamuserSchema }]),
    MongooseModule.forFeature([{ name: 'Team', schema: TeamSchema }]),
    MongooseModule.forFeature([{ name: 'Map', schema: MapSchema }]),
    JwtModule.registerAsync({
      useFactory(){
        return {
          secret: process.env.SECRET,
          signOptions: {expiresIn:'1200s'}
        }
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy,JwtStrategy, TeamuserService]
})
export class AuthModule {}
