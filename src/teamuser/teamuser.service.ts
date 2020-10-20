import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TeamuserSchema } from './schema/teamuser.schema';
import { TeamuserDto } from './dto/teamuser.dto';

import { Team } from '../team/schema/team.schema';
import { Map } from 'src/map/schema/map.schema';

let mongoose=require('mongoose');

@Injectable()
export class TeamuserService {
    constructor(
        @InjectModel('Teamuser') private teamuserModel,
        @InjectModel('Team') private teamModel: Model<Team>,
        @InjectModel('Map') private mapModel
    ) {}

    async create(teamuserDto: TeamuserDto){
        teamuserDto.manageTeamList = null
        teamuserDto.joinTeamList = null
        const createdTeamUser = new this.teamuserModel(teamuserDto)
        return await createdTeamUser.save()
    }

    async joinTeam(userName,teamId){
        //将用户加入团队
        let user = await this.teamuserModel.findOne({'weixinName': userName})
        if(!user){
            return { error: true, msg: '名字错误'}
        }
        else if(user.role == '领导'){
            return { error: true, msg: '领导不能加入团队'}
        }
        else if(user.role == '管理员'){
            return { error: true, msg: '管理员不能加入团队'}
        }
        user = await this.teamuserModel.find({
            'weixinName': userName,
            $or:[{
                "manageTeamList.teamId": mongoose.Types.ObjectId(teamId)
            },
            {
                "joinTeamList.teamId": mongoose.Types.ObjectId(teamId)
            }]
        })
        if(user.length != 0){
            return { error: true, msg: '用户存在团队中'}
        }
        return await this.teamuserModel.findOneAndUpdate(
            {
                'weixinName': userName
            },
            {
                '$addToSet': {
                    joinTeamList: [{
                        'teamId': mongoose.Types.ObjectId(teamId),
                        'defaultMapId': mongoose.Types.ObjectId(teamId),  //加入团队后的默认地图设置？
                        'power': 1
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
                '$push': {
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
        //根据用户ID获取管理团队以及地图列表
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
            },
            {
                $lookup: {
                    from: 'maps',
                    localField: 'manageTeamList.teamId',
                    foreignField: 'team_Id',
                    as: 'manageTeamList.mapList'
                }
            }
        ])
    }

    async getJoinTeamMapList(userId){
        //根据用户ID获取加入团队以及地图列表
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
            },
            ,
            {
                $lookup: {
                    from: 'maps',
                    localField: 'joinTeamList.teamId',
                    foreignField: 'team_Id',
                    as: 'joinTeamList.mapList'
                }
            }
        ])
    }

    async getJoinTeamUsersList(teamId){
        //根据teamId 返回团队用户列表
        return await this.teamuserModel.aggregate([
            {
                $match:{"joinTeamList.teamId": mongoose.Types.ObjectId(teamId), 'role': "普通用户"}
            },
            {
                $unwind: '$joinTeamList'
            },
            {
                $match:{"joinTeamList.teamId": mongoose.Types.ObjectId(teamId)}
            }
        ])
        // console.log(res)
        // return await this.teamuserModel.find({"joinTeamList.teamId": mongoose.Types.ObjectId(teamId), 'role': "普通用户"}, ['_id','weixinName','role','joinTeamList.teamId','joinTeamList.power'])
    }

    async updateUsersTeamPower(userId, teamId, power){
        //修改用户操作团队的权限
        let userInfo = await this.teamuserModel.findById(mongoose.Types.ObjectId(userId))
        for(var i = 0; i < userInfo.joinTeamList.length; i++){
            console.log(userInfo.joinTeamList[i].teamId)
            console.log(teamId)
            if(userInfo.joinTeamList[i].teamId == teamId){
                userInfo.joinTeamList[i].power = power
                userInfo.markModified('power')
                return await userInfo.save()
            }
        }
        return '没有找到该用户加入的团队'
    }

    async updateDefaultTeam(userId, teamId){
        // 修改用户默认团队ID
        return await this.teamuserModel.findOneAndUpdate(
            {
                _id: mongoose.Types.ObjectId(userId)
            },
            {
                '$set': {
                    'defaultTeamId': mongoose.Types.ObjectId(teamId)
                }
            },
            {
                new: true
            }
        )
    }

    async updateTeamDefaultMap(userId, teamId, mapId){
        //修改团队的默认地图ID

        let mapinfoOrigin = await this.mapModel.findById(mongoose.Types.ObjectId(mapId))
        let mapinfo = mapinfoOrigin.toObject()
        if(mapinfo.team_Id != teamId){
            return '团队中没有该地图'
        }
        let userInfo = await this.teamuserModel.findById(mongoose.Types.ObjectId(userId))
        for(var i = 0; i < userInfo.manageTeamList.length; i++){
            if(userInfo.manageTeamList[i].teamId == teamId){
                userInfo.manageTeamList[i].defaultMapId = mongoose.Types.ObjectId(mapId)
                userInfo.markModified('defaultMapId')
                return await userInfo.save()
            }
        }
        for(var i = 0; i < userInfo.joinTeamList.length; i++){
            if(userInfo.joinTeamList[i].teamId == teamId){
                userInfo.joinTeamList[i].defaultMapId = mongoose.Types.ObjectId(mapId)
                userInfo.markModified('defaultMapId')
                return await userInfo.save()
            }
        }
        return '没有找到该用户加入的团队'

    }

    async removeUserFromTeam(userId, teamId){
        //将用户移除出团队
        let userInfo = await this.teamuserModel.findById(mongoose.Types.ObjectId(userId))
        for(var i = 0; i < userInfo.joinTeamList.length; i++){
            if(userInfo.joinTeamList[i].teamId == teamId){
                userInfo.joinTeamList.splice(i,1)
                userInfo.markModified('removeTeam')
                return await userInfo.save()
            }
        }
        return {error: true, msg: '用户不在团队成员中'}
    }

    async removeUserFromManageTeam(userId, teamId){
        //将用户移除出管理团队
        let userInfo = await this.teamuserModel.findById(mongoose.Types.ObjectId(userId))
        for(var i = 0; i < userInfo.manageTeamList.length; i++){
            if(userInfo.manageTeamList[i].teamId == teamId){
                userInfo.manageTeamList.splice(i,1)
                userInfo.markModified('removeTeam')
                return await userInfo.save()
            }
        }
        return {error: true, msg: '用户不在团队管理员中'}
    }

    async getUserInfoById(userId){
        return await this.teamuserModel.findById(mongoose.Types.ObjectId(userId))
    }


    async getManageTeamUsersList(teamId){
        //根据teamId 返回团队管理员列表
        return await this.teamuserModel.aggregate([
            {
                $match:{"manageTeamList.teamId": mongoose.Types.ObjectId(teamId), 'role': "普通用户"}
            },
            {
                $unwind: '$manageTeamList'
            },
            {
                $match:{"manageTeamList.teamId": mongoose.Types.ObjectId(teamId)}
            }
        ])
        // return await this.teamuserModel.find({"manageTeamList.teamId": mongoose.Types.ObjectId(teamId),'role': "普通用户"}, ['_id','weixinName','role','manageTeamList.teamId','manageTeamList.power'])
    }

    async manageTeam(userName,teamId){
        //将用户添加为管理员
        let user = await this.teamuserModel.findOne({'weixinName': userName})
        if(!user){
            return { error: true, msg: '名字错误'}
        }
        else if(user.role == '领导'){
            return { error: true, msg: '领导不能加入团队'}
        }
        else if(user.role == '管理员'){
            return { error: true, msg: '管理员不能加入团队'}
        }
        user = await this.teamuserModel.find({
            'weixinName': userName,
            $or:[{
                "manageTeamList.teamId": mongoose.Types.ObjectId(teamId)
            }]
        })
        if(user.length != 0){
            return { error: true, msg: '用户存在团队中'}
        }
        return await this.teamuserModel.update(
            {
                'weixinName': userName
            },
            {
                '$pull':{
                    joinTeamList: {
                        'teamId': mongoose.Types.ObjectId(teamId)
                    }
                },
                '$addToSet': {
                    manageTeamList: [{
                        'teamId': mongoose.Types.ObjectId(teamId),
                        'defaultMapId': mongoose.Types.ObjectId(teamId),  //加入团队后的默认地图设置？
                        'power': 2
                    }]
                }
            },
            {
                new: true
            }
        )
    }

    async deleteUserFormJoinTeam(userId, teamId){
        //将用户移除出团队
        
    }

    async deleUserFormManageTeam(userId,teamId){
        //将用户移除出管理团队
    }

    async getUserListByPages(query: object, page: number, limit: number){
        let count = await this.teamuserModel.find(query).countDocuments()
        //计算总页数
        let pages = Math.ceil(count / limit);
        //取值不能超过pages
        page = Math.min(page, pages);
        //取值不能小于1
        page = Math.max(page, 1);
        let skip = (page - 1) * limit;

        let res = {}

        let result = await this.teamuserModel.find(query,['_id','weixinName','password','role']).sort({'role': -1}).limit(limit).skip(skip)
        res['result'] = result
        res['totalPageNum'] = pages
        res['totalNum'] = count
        return res
    }

    async updateUserInfo(userId, userInfo:TeamuserDto){
        //更新用户信息
        return await this.teamuserModel.findOneAndUpdate(
            {
                _id: userId
            },
            {
                $set: userInfo
            },
            {
                new: true
            }
        )
    }

    async deleteUser(userId){
        //删除用户信息
        return await this.teamuserModel.delete({_id: mongoose.Types.ObjectId(userId)})
    }


}


