import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
    timestamps: true
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
}

export const LayerSchema = SchemaFactory.createForClass(Layer);