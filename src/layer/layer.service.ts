import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Layer } from './schema/layer.schema';
import { LayerDto } from './dto/layer.dto';

@Injectable()
export class LayerService {
    constructor(@InjectModel('Layer') private layerModel: Model<Layer>) {}

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

}
