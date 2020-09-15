import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
    timestamps: true
})

export class Marker extends Document {

    @Prop({
        unique: true
    })
    id: number;

    @Prop()
    latitude: number;

    @Prop()
    longitude: number;

    @Prop()
    width: number;

    @Prop()
    height: number;

    @Prop()
    iconPath: string;

    @Prop()
    callout: object;

    @Prop()
    layer_name: string;
}

export const MarkerSchema = SchemaFactory.createForClass(Marker);