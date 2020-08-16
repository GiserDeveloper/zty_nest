import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { hashSync } from 'bcryptjs'

@Schema({
    timestamps: true
})
export class User extends Document {
    @Prop({
        unique: true
    })
    username: string;

    @Prop({
        set(val){
            return val ? hashSync(val) : val
        }
    })
    password: string;

    @Prop()
    description: string;

    @Prop()
    roleId: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
