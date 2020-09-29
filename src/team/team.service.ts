import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Team } from './schema/team.schema';
import { TeamDto } from './dto/team.dto';

@Injectable()
export class TeamService {
    constructor(@InjectModel('Team') private teamModel: Model<Team>) {}

    async create(teamDto: TeamDto): Promise<Team> {
        const createdTeam = new this.teamModel(teamDto);
        return await createdTeam.save();
    }

    async findAll(): Promise<Team[]> {
        return await this.teamModel.find().exec();
    }

    async getTeamById(id): Promise<Team> {
        return await this.teamModel.findById(id);
    }
}
