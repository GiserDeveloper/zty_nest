import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TeamuserSchema } from './schema/teamuser.schema';
import { TeamuserDto } from './dto/teamuser.dto';

@Injectable()
export class TeamuserService {
    constructor(@InjectModel('Teamuser') private teamuserModel) {}

    async create(teamuserDto: TeamuserDto){
        const createdTeamUser = new this.teamuserModel(teamuserDto)
        return await createdTeamUser.save()
    }
}


