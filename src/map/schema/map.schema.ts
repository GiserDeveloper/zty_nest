import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
    timestamps: true
})

export class Map extends Document {

    @Prop()
    mapName: string;

    @Prop()
    isActive: boolean;

    @Prop()
    layerCount: number;
}

export const MapSchema = SchemaFactory.createForClass(Map);