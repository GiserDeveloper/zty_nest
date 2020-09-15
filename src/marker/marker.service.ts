import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Marker } from './schema/marker.schema';
import { MarkerDto } from './dto/marker.dto';

@Injectable()
export class MarkerService {
    constructor(@InjectModel('Marker') private markerModel: Model<Marker>) {}

    async create(markerDto: MarkerDto): Promise<Marker> {
        const createdMarker = new this.markerModel(markerDto);
        return await createdMarker.save();
    }
}
