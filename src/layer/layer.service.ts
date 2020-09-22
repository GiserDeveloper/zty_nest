import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Layer, LayerSchema } from './schema/layer.schema';
import { LayerDto, modifyLayerFieldDto } from './dto/layer.dto';

import { Marker } from '../marker/schema/marker.schema';

@Injectable()
export class LayerService {
    constructor(
        @InjectModel('Layer') private layerModel: Model<Layer>,
        @InjectModel('Marker') private markerModel: Model<Marker>
    ) {}

    async create(layerDto: LayerDto): Promise<Layer> {
        const createdLayer = new this.layerModel(layerDto);
        return await createdLayer.save();
    }

    async findAllLayers(){
        return await this.layerModel.find()
    }

    // 修改图层信息-字段
    async modifyLayer(query, updateContent){
        return await this.layerModel.findOneAndUpdate(
            {
                layerName: query
            },
            {
                $set: updateContent
            },
            {
                new: true
            }
        )
    }

    // 根据图层名称查找图层信息
    async findLayerInfoByName(layerName){
        return await this.layerModel.findOne({layerName: layerName})
    }

    // 新增图层字段
    async addLayerField(addLayerProperty, modifyLayerName){
        // 批量更新
        let tmp = {}
        tmp['$addToSet'] = addLayerProperty
        return await this.layerModel.findOneAndUpdate({
            layerName: modifyLayerName
        },tmp,{new: true})
    }

    // 删除图层字段
    async deleteLayerField(deleteLayerProperty, modifyLayerName){
        let tmp = {}
        tmp['$pull'] = deleteLayerProperty
        return await this.layerModel.findOneAndUpdate({
            layerName: modifyLayerName
        },tmp,{new: true})
    }

    // 根据地图查找图层
    async findLayerByMap(mapName){
        return await this.layerModel.find({
            map_name: mapName
        })
    }

    // 删除图层
    async deleteLayer(layerName){
        return await this.layerModel.deleteOne({
            layerName: layerName
        })
    }
}
