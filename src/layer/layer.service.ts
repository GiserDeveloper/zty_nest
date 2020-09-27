import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Layer, LayerSchema } from './schema/layer.schema';
import { LayerDto, modifyLayerFieldDto } from './dto/layer.dto';

import { Marker } from '../marker/schema/marker.schema';
let mongoose=require('mongoose');

@Injectable()
export class LayerService {
    constructor(
        @InjectModel('Layer') private layerModel: Model<Layer>,
        @InjectModel('Marker') private markerModel: Model<Marker>
    ) {}

    async create(layerDto): Promise<Layer> {
        layerDto.map_id = mongoose.Types.ObjectId(layerDto.map_id)
        const createdLayer = new this.layerModel(layerDto);
        return await createdLayer.save();
    }

    async findAllLayers(){
        return await this.layerModel.find()
    }

    // 修改图层信息-字段
    async modifyLayer(query, updateContent){
        console.log(query,updateContent)
        query = mongoose.Types.ObjectId(query)
        return await this.layerModel.findOneAndUpdate(
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

    // 根据图层名称查找图层信息
    async findLayerInfoById(layerId){
        let layerID = mongoose.Types.ObjectId(layerId)
        return await this.layerModel.findOne({_id: layerID})
    }

    // 新增图层字段
    async addLayerField(addLayerProperty, modifyLayerId){
        let modifyLayerID = mongoose.Types.ObjectId(modifyLayerId)
        // 批量更新
        let tmp = {}
        tmp['$addToSet'] = addLayerProperty
        return await this.layerModel.findOneAndUpdate({
            _id: modifyLayerID
        },tmp,{new: true})
    }

    // 
    async addLayerField2(addLayerProperty, modifyLayerName){
        // 批量更新
        let tmp = {}
        tmp[addLayerProperty.modifyFieldName] = mongoose.Types.ObjectId(addLayerProperty.modifyFieldNameCon)
        console.log(tmp)
        console.log(mongoose.Types.ObjectId.isValid(tmp[addLayerProperty.modifyFieldName]))
        return await this.layerModel.updateMany({
            layerName: modifyLayerName
        }, {
            $set: tmp
        }, (err) => { })
    }

    // 删除图层字段
    async deleteLayerField(deleteLayerProperty, modifyLayerId){
        let modifyLayerID = mongoose.Types.ObjectId(modifyLayerId)
        let tmp = {}
        tmp['$pull'] = deleteLayerProperty
        return await this.layerModel.findOneAndUpdate({
            _id: modifyLayerID
        },tmp,{new: true})
    }

    // 根据地图查找图层
    async findLayerByMap(mapName){
        return await this.layerModel.find({
            map_name: mapName
        })
    }

    // 删除图层
    async deleteLayer(layerId){
        let layerID = mongoose.Types.ObjectId(layerId)
        return await this.layerModel.deleteOne({
            _id: layerID
        })
    }
}
