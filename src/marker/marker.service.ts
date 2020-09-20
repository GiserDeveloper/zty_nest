import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Marker } from './schema/marker.schema';
import { MarkerDto } from './dto/marker.dto';

import { Counter } from 'src/counter/schema/counter.schema';
import { Layer } from 'src/layer/schema/layer.schema';
import { Map } from 'src/map/schema/map.schema';

@Injectable()
export class MarkerService {
    constructor(
        @InjectModel('Marker') private markerModel: Model<Marker>,
        @InjectModel('Counter') private counterModel: Model<Counter>,
        @InjectModel('Layer') private layerModel: Model<Layer>,
        @InjectModel('Map') private mapModel: Model<Map>
    ) {}

    // 返回带自增id的数据
    async create(markerDto: any){
        try {
            let counter = await this.counterModel.findOneAndUpdate(
                { _id: 'markerIdSeqGenerator'},
                { $inc: {seq:1}},
                {
                    new: true,
                    upsert: true
                }
            )
            markerDto.id = counter.seq;
            try {
                return await this.markerModel.create(markerDto)
            } catch (error) {
                
            }
        } catch (error) {
            
        }
    }

    // 查询给定图层name的点
    async findMarkerByLayerName(layerName){
        return await this.markerModel.find({layer_name: layerName});
    }

    // 查找所有的点
    async findAllMarkers(){
        return await this.markerModel.find();
    }

    // 查询给定一组图层name的点
    async findMarkerByMultiLayerNames(layerNames){
        const result = [];
        await this.markerModel.find(null,(err,doc)=>{
            doc.map((value)=>{
                if(layerNames.includes(value.layer_name)){
                    result.push(value);
                }
            })
        })
        return result;
    }

    // 查询 处于激活状态的 地图 的 可见的图层的点数据
    async findMarkerActive(){
        return await this.markerModel.aggregate([
            {
                $lookup:{
                    from: "layers",
                    localField: "layer_name",
                    foreignField: "layerName",
                    as: "layerInfo"
                }
            },
            {
                $lookup:{
                    from: "maps",
                    localField: "map_name",
                    foreignField: "mapName",
                    as: "mapInfo"
                },
            },
            {
                $match: {
                    'layerInfo.isVisible': true,
                    'mapInfo.isActive': true
                }
            }
        ])
    }

    // 根据点的ID查询点信息
    async queryMarkerByID(id){
        return await this.markerModel.findOne({id: id});
    }

}
