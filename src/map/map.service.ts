import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Map } from './schema/map.schema';
import { MapDto } from './dto/map.dto';

@Injectable()
export class MapService {
    constructor(@InjectModel('Map') private mapModel: Model<Map>) {}

    async create(mapDto: MapDto): Promise<Map> {
        const createdMap = new this.mapModel(mapDto);
        return await createdMap.save();
    }

    async findAllMaps(){
        return await this.mapModel.find()
    }
}

