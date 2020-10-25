import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TeamuserSchema } from './schema/teamuser.schema';
import { TeamuserDto } from './dto/teamuser.dto';

import { Team } from '../team/schema/team.schema';
import { Map } from 'src/map/schema/map.schema';

// import { exec } from 'child_process';
// import { stderr } from 'process';
// import { resolve } from 'path';
const execSync = require('child_process').execSync;
// const spawn = require('child_process').spawn
const iconv = require('iconv-lite');

let mongoose=require('mongoose');

@Injectable()
export class TeamuserService {
    constructor(
        @InjectModel('Teamuser') private teamuserModel,
        @InjectModel('Team') private teamModel: Model<Team>,
        @InjectModel('Map') private mapModel
    ) {}

    async create(teamuserDto){
        teamuserDto.manageTeamList = []
        teamuserDto.joinTeamList = []
        teamuserDto.careProjectList = []
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
            },
            {
                $project: { '_id': 1, 'weixinName': 1, 'joinTeamList': 1}
            },
            {
                $sort: {
                    "joinTeamList._id": 1
                }
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
        let mapinfo = mapinfoOrigin? mapinfoOrigin.toObject() : {}
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

    async getUserInfoByName(weixinName){
        return await this.teamuserModel.findOne({
            weixinName: weixinName
        })
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
            },
            {
                $project: { '_id': 1, 'weixinName': 1, 'manageTeamList': 1}
            },
            {
                $sort: {
                    "manageTeamList._id": 1
                }
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

    async updatePassword(userId, oldPassword, newPassword){
        let userInfo = await this.teamuserModel.findOne({_id: mongoose.Types.ObjectId(userId)})
        console.log(userInfo.password)
        if(oldPassword != userInfo.password){
            return {error: true, msg: '密码错误'}
        }
        return　await this.teamuserModel.findOneAndUpdate({
            _id: userId
        },
        {
            $set: {password : newPassword}
        },
        {
            new: true
        })
    }

    async getUserPower(userId,teamId){
        let userinfo = await this.teamuserModel.findOne({_id: mongoose.Types.ObjectId(userId)})
        if(userinfo.role == "领导"){
            return {power: 1}
        }
        let joinTeamRes = await this.teamuserModel.aggregate([
            {
                $match: {_id: mongoose.Types.ObjectId(userId)}
            },
            {
                $unwind: '$joinTeamList'
            },
            {
                $match:{"joinTeamList.teamId": mongoose.Types.ObjectId(teamId)}
            },
            {
                $project: {"joinTeamList.power": 1}
            }
        ])

        if(joinTeamRes.length != 0){
            return {power: joinTeamRes[0].joinTeamList.power}
        }

        let res = await this.teamuserModel.aggregate([
            {
                $match: { _id: mongoose.Types.ObjectId(userId)}
            },
            {
                $unwind: '$manageTeamList'
            },
            {
                $match:{"manageTeamList.teamId": mongoose.Types.ObjectId(teamId)}
            },
            {
                $project: {"manageTeamList.power": 1, 'role': 1}
            }
        ])
        return {power: res[0].manageTeamList.power}
    }

      //新增用户关注项目
      async addCareProject(userId, newProjectName){
        let userInfo = await this.teamuserModel.findById(mongoose.Types.ObjectId(userId))
        let ProjList = userInfo.careProjectList
        let newProjectInfo = {'projectName':'', 'latestDate':''}
        let mydate = new Date()  //为时间戳做准备

        for(let key in ProjList){  //若该项目已收藏，则返回已有该记录
            if(ProjList[key]['projectName'] == newProjectName)   return '已有该记录！'
        }

        newProjectInfo.projectName = newProjectName
        newProjectInfo.latestDate = mydate.getFullYear() + '-' + (mydate.getMonth() + 1) + '-' + mydate.getDate() //加入今天的时间戳
        ProjList.push(newProjectInfo) //将新记录插入收藏数组中

        await this.teamuserModel.findOneAndUpdate(
                {_id: mongoose.Types.ObjectId(userId)},
                {careProjectList: ProjList},
                {new: true}
        ) 

        return '添加关注项目：' + newProjectName
    }


    //删除用户关注项目
    async deleteCareProject(userId, deleteProjectName){
        let userInfo = await this.teamuserModel.findById(mongoose.Types.ObjectId(userId))
        let newProjList = userInfo.careProjectList
        let existFlag = 0 //判断要删除的项目在不在

        for(let key in newProjList){  //通过遍历原有数组找到要删除的记录
            if(newProjList[key]['projectName'] == deleteProjectName){
                newProjList.splice(key, 1) //根据索引删除该条记录
                existFlag = 1
            }
        }

        if(existFlag == 0){
            return '该项目不存在收藏列表内！'
        }

        await this.teamuserModel.findOneAndUpdate(
            {_id: mongoose.Types.ObjectId(userId)},
            {careProjectList: newProjList},
            {new: true}
        )

        return '取消关注项目: '+ deleteProjectName
    }
    
    //获取用户关注列表
    async getCareProjectList(userId){
        return await this.teamuserModel.find(
            {_id: mongoose.Types.ObjectId(userId)},
            ['weixinName', 'careProjectList', '_id']

        )
    }


    //查看项目是否有更新
    async getNewCareInfo(projectName){
        // 调用爬虫获取信息
        //进程流方法
        // console.log(projectName)
        // return new Promise((resolve, reject) => {
        //     const  sp = spawn('python',['D:/EnglishPath/Web1_采购与招标网_10.16.py '+projectName], {shell:true})

        //     sp.on('error',(err) => {
        //         console.log(err)
        //         reject(err)
        //     })
    
        //     sp.stdout.on('data', (data)=>{
        //         let str = iconv.decode(data,'gb2312').toString()
        //         let rightStr = str.replace(/'/g, '"')
        //         //console.log(str.replace(/'/g, '"')) 
        //         resolve(JSON.parse(rightStr))  //将二进制文件流转为JSON数组
        //     })
    
        //     sp.stderr.on('data', (data) => {
        //         console.log('stderr');
        //         //console.log(data)
        //         //console.error(`sp 的 stderr: ${data}`);
        //     })
    
        //     sp.on('close', (code) => {
        //         if (code !== 0) {
        //             console.log(`sp 进程退出，退出码 ${code}`);
        //         }
        //     })
        // })
        const output = execSync('python D:/teamuser/Web1_采购与招标网_10.16.py '+projectName)
        let str = iconv.decode(output,'gb2312').toString()
        let rightStr = str.replace(/'/g, '"')
        return JSON.parse(rightStr)
    }



    async checkNewInfo(userId){
        let userInfo = await this.teamuserModel.findById(mongoose.Types.ObjectId(userId))
        let ProjList = userInfo.careProjectList
        let newProjectList = ProjList //更新数据库中记录的最新时间
        let newProjInfos = []  //返回新消息的容器

        if( !ProjList || ProjList.length == 0 ){  //若个人数据中不存在项目列表或列表为空，则返回无关注
            return '暂无关注项目'
        }

        for(let key in ProjList){  //列表中每个项目都调用爬虫
            let temp_Info = {'projectName':'', 'news':[],'newCount':0 , 'IsUpdate':false}  //返回的格式  名称，新消息内容，更新标
            temp_Info.projectName = ProjList[key]['projectName']

            let projectInfo = {}
            projectInfo = await this.getNewCareInfo(ProjList[key]['projectName'])   //调用爬虫获取项目所有的消息
            for (let key1 in projectInfo){   //逐条消息比对时间
                if( projectInfo[key1]['date'] > ProjList[key]['latestDate']){ //对爬到的每一条新闻，都和最近时间比较，若更新一些，则放入news中
                    temp_Info.news.push(projectInfo[key1])
                }
            }
            
            //console.log(temp_Info.news)

            if( temp_Info['news'][0]  ){
                temp_Info.IsUpdate = true  //如果news中有记录，则将更新标变更为true
                newProjectList[key]['latestDate'] = projectInfo[0]['date']  //用新消息中的最新时间更新项目的时间戳
                
            }

            temp_Info['newCount'] = temp_Info['news'].length  //获取新消息条数
            delete temp_Info['news']  //删除新消息字段

            if( temp_Info.IsUpdate == true){
                newProjInfos.push(temp_Info)
            }

        }

        //console.log(newProjectList)
        await this.teamuserModel.findOneAndUpdate(
            {_id: mongoose.Types.ObjectId(userId)},
            {careProjectList: newProjectList},
            {new: true}
        )   //更新数据库中的时间，使用异步操作
        
        return newProjInfos
    }

    //搜索项目记录的接口
    async getAllInfo(projectName){
        const output = execSync('python D:/teamuser/采购与招标网_搜索.py '+projectName)
        let str = iconv.decode(output,'gb2312').toString()
        let rightStr = str.replace(/'/g, '"')
        return JSON.parse(rightStr)
    }

}


