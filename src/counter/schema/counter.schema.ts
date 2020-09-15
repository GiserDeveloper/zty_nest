import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
    timestamps: true
})

export class Counter extends Document {

    @Prop({
        type: String,
        required: true
    })
    _id;

    @Prop()
    seq: number;

}

export const CounterSchema = SchemaFactory.createForClass(Counter);