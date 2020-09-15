import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Marker } from './schema/marker.schema';
import { MarkerDto } from './dto/marker.dto';

import { Counter } from 'src/counter/schema/counter.schema';
import { Layer } from 'src/layer/schema/layer.schema';

@Injectable()
export class MarkerService {
    constructor(
        @InjectModel('Marker') private markerModel: Model<Marker>,
        @InjectModel('Counter') private counterModel: Model<Counter>,
        @InjectModel('Layer') private layerModel: Model<Layer>
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

    // 查询所有点 - 带详细信息


    // 查询给定图层name的点
    async findMarkerByLayerName(layerName){
        return await this.markerModel.find({layer_name: layerName});
    }

    // 查找所有的点
    async findAllMarkers(){
        return await this.markerModel.find();
    }

}
