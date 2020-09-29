import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
    timestamps: true
})

export class Team extends Document {

    @Prop({
        
    })
    teamName: string;
}

export const TeamSchema = SchemaFactory.createForClass(Team);