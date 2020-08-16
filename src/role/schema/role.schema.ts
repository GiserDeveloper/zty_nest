import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
    timestamps: true
})

export class Role extends Document {
    @Prop({
        unique: true
    })
    roleId: number;

    @Prop({
        unique: true
    })
    roleName: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);