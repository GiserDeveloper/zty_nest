import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Map } from './schema/map.schema';
import { MapDto } from './dto/map.dto';
import { query } from 'express';

let mongoose=require('mongoose');

@Injectable()
export class MapService {
    constructor(@InjectModel('Map') private mapModel: Model<Map>) {}

    async create(mapDto: MapDto): Promise<Map> {
        mapDto.team_Id = mongoose.Types.ObjectId(mapDto.team_Id)
        const createdMap = new this.mapModel(mapDto);
        return await createdMap.save();
    }

    async findAllMaps(){
        return await this.mapModel.find()
    }

    // 修改图层信息-字段
    async modifyMap(query, updateContent){
        query = mongoose.Types.ObjectId(query)
        if(updateContent.team_Id){
            updateContent.team_Id = mongoose.Types.ObjectId(updateContent.team_Id)
        }
        console.log(query, updateContent)
        return await this.mapModel.findOneAndUpdate(
            {
                _id: query
            },
            {
                $set: updateContent
            },
            {
                new: true
            }
        )
    }

    async getMapListByTeamId(teamId){
        //根据teamId获取地图列表
        console.log(teamId)
        return await this.mapModel.find({
            'team_Id': mongoose.Types.ObjectId(teamId)
        })
    }

    async deletMapById(mapId){
        return await this.mapModel.deleteOne({_id: mongoose.Types.ObjectId(mapId)})
    }
}

