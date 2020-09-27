import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
    timestamps: true,
    strict: false
})

export class Layer extends Document {

    @Prop({
        unique: true
    })
    layerName: string;

    @Prop()
    map_name: string;

    @Prop()
    isDefaultLayer: boolean;

    @Prop()
    isVisible: boolean;

    @Prop()
    markerCount: number;

    @Prop()
    fieldList: string[];

}

export const LayerSchema = SchemaFactory.createForClass(Layer);
