import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Layer } from './schema/layer.schema';
import { LayerDto } from './dto/layer.dto';

@Injectable()
export class LayerService {
    constructor(@InjectModel('Layer') private layerModel: Model<Layer>) {}

    async create(layerDto: LayerDto): Promise<Layer> {
        console.log(layerDto)
        const createdLayer = new this.layerModel(layerDto);
        return await createdLayer.save();
    }
}
