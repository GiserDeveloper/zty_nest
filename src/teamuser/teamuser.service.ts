import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TeamuserSchema } from './schema/teamuser.schema';
import { TeamuserDto } from './dto/teamuser.dto';

import { Team } from '../team/schema/team.schema'
import { Map } from 'src/map/schema/map.schema';

let mongoose=require('mongoose');

@Injectable()
export class TeamuserService {
    constructor(
        @InjectModel('Teamuser') private teamuserModel,
        @InjectModel('Team') private teamModel: Model<Team>,
        @InjectModel('Map') private mapModel: Model<Map>
    ) {}

    async create(teamuserDto: TeamuserDto){
        const createdTeamUser = new this.teamuserModel(teamuserDto)
        return await createdTeamUser.save()
    }

    async joinTeam(userId,teamId){
        //将用户加入团队
        return await this.teamuserModel.findOneAndUpdate(
            {
                _id: mongoose.Types.ObjectId(userId)
            },
            {
                '$addToSet': {
                    joinTeamList: [{
                        'teamId': mongoose.Types.ObjectId(teamId),
                        'defaultMapId': mongoose.Types.ObjectId(teamId),  //加入团队后的默认地图设置？
                        'power': 0
                    }]
                }
            },
            {
                new: true
            }
        )
    }

    async createTeam(userId,teamName){
        //创建新的团队
        const createTeam = new this.teamModel({ 'teamName' : teamName})
        let newTeam = await createTeam.save()
        console.log(newTeam)

        return await this.teamuserModel.findOneAndUpdate(
            {
                _id: mongoose.Types.ObjectId(userId)
            },
            {
                // dafaultTeamId: mongoose.Types.ObjectId(newTeam._id)
                '$addToSet': {
                    manageTeamList: [{
                        "teamId": mongoose.Types.ObjectId(newTeam._id),
                        "defaultMapId": mongoose.Types.ObjectId(newTeam._id),
                        "power": 2
                    }]
                }
            },
            {
                new: true
            }
        )
    }

    async getManageTeamList(userId){
        //根据用户ID获取管理团队列表
        return await this.teamuserModel.aggregate([
            {
                $match: {_id : mongoose.Types.ObjectId(userId)}
            },
            {
                $project: {_id:1,manageTeamList:1,defaultTeamId:1,weixinName:1}
            },
            {
                $unwind: '$manageTeamList'
            },
            {
                $lookup: {
                    from: 'teams',
                    localField: 'manageTeamList.teamId',
                    foreignField: '_id',
                    as: 'manageTeamList.teamInfo'
                }
            }
        ])
    }

    async getJoinTeamList(userId){
        //根据用户ID获取加入团队列表
        return await this.teamuserModel.aggregate([
            {
                $match: {_id : mongoose.Types.ObjectId(userId)}
            },
            {
                $project: {_id:1,joinTeamList:1,defaultTeamId:1,weixinName:1}
            },
            {
                $unwind: '$joinTeamList'
            },
            {
                $lookup: {
                    from: 'teams',
                    localField: 'joinTeamList.teamId',
                    foreignField: '_id',
                    as: 'joinTeamList.teamInfo'
                }
            }
        ])
    }

    async getManageTeamMapList(userId){
        //根据用户ID获取管理团队列表
        return await this.teamuserModel.aggregate([
            {
                $match: {_id : mongoose.Types.ObjectId(userId)}
            },
            {
                $project: {_id:1,manageTeamList:1,defaultTeamId:1,weixinName:1}
            },
            {
                $unwind: '$manageTeamList'
            },
            {
                $lookup: {
                    from: 'maps',
                    localField: 'manageTeamList.teamId',
                    foreignField: 'team_id',
                    as: 'manageTeamList.mapList'
                }
            }
        ])
    }

    async getJoinTeamMapList(userId){
        //根据用户ID获取加入团队列表
        return await this.teamuserModel.aggregate([
            {
                $match: {_id : mongoose.Types.ObjectId(userId)}
            },
            {
                $project: {_id:1,joinTeamList:1,defaultTeamId:1,weixinName:1}
            },
            {
                $unwind: '$joinTeamList'
            },
            {
                $lookup: {
                    from: 'teams',
                    localField: 'joinTeamList.teamId',
                    foreignField: '_id',
                    as: 'joinTeamList.teamInfo'
                }
            }
        ])
    }
}


