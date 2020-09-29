import { Document, Schema, SchemaType } from 'mongoose';

export const SettingSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId
    },

    layerId: {
        type: Schema.Types.ObjectId
    },

    isVisible:{
        type: Boolean
    }

})

