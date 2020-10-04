import { Model } from 'mongoose';
import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SettingSchema } from './schema/setting.schema';
import { SettingDto } from './dto/setting.dto';

import { Layer } from 'src/layer/schema/layer.schema';
import { LayerService } from '../layer/layer.service'
import { TeamuserSchema } from '../teamuser/schema/teamuser.schema'

let mongoose=require('mongoose');

@Injectable()
export class SettingService {
    constructor(
        @InjectModel('Setting') private settingModel,
        @InjectModel('Layer') private layerModel: Model<Layer>,
        @InjectModel('TeamUser') private teamuserModel
    ) {}

    async create(settingDto: SettingDto) {
        const createdSetting = new this.settingModel(settingDto);
        return await createdSetting.save();
    }

    async updateSetting(userId, layerId, isVisible){
        //修改用户图层设置
        return await this.settingModel.findOneAndUpdate(
            {
                userId: mongoose.Types.ObjectId(userId),
                mapId: mongoose.Types.ObjectId(layerId)
            },
            {
                '$set': {
                    'isVisible': isVisible
                }
            },
            {
                new: true
            }
        )
    }

    async initSettings(){
        let userInfoList = await this.teamuserModel.aggregate(
            [{
                $project: {_id: 1}
            }]
        )
        console.log(userInfoList)
        let layerInfoList = await this.layerModel.aggregate(
            [{
                $project: {_id: 1}
            }]
        )
        console.log(layerInfoList)
        for(var i = 0; i < userInfoList.length; i++){
            for(var j = 0; j < layerInfoList.length; j++){
                this.create({userId: userInfoList[i]._id, layerId: layerInfoList[j]._id, isVisible: true})
            }
        }
        return 'OK'
    }

    async getSettingById(userId){
        return await this.settingModel.find({'userId': mongoose.Types.ObjectId(userId)})
    }

    async getMapSettingById(userId,mapId){
        let layerIdList = await this.layerModel.aggregate(
            [{
                $match: {'map_id': mongoose.Types.ObjectId(mapId)}
            },
            {
                $project: {'_id': 1}
            }]
        )
        console.log(layerIdList)
        return await this.settingModel.find({'userId': mongoose.Types.ObjectId(userId), 'layerId': {$in: layerIdList}})
    }

    async getUserSettingByLayerId(userId,layerId){
        return await this.settingModel.find({'userId': mongoose.Types.ObjectId(userId), 'layerId': mongoose.Types.ObjectId(layerId)})
    }

    async insertUserSettingOfNewLayer(layerId){
        let userIdList = await this.teamuserModel.aggregate(
            [{
                $project: {_id: 1}
            }]
        )
        let settingList = new Array()
        for(let i = 0; i < userIdList.length; i++){
            let setting = this.settingModel({
                layerId: mongoose.Types.ObjectId(layerId),
                userId: mongoose.Types.ObjectId(userIdList[i]),
                isVisible: true
            })
            settingList.push(setting)
        }
        return await this.settingModel.insertMany(settingList)
    }

    async deleteManyByLayerId(layerId){
        return await this.settingModel.deleteMany({'layerId': mongoose.Types.ObjectId(layerId)})
    }
}
