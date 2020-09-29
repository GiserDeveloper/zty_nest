import { Document, Schema, SchemaType } from 'mongoose';

export const TeamuserSchema = new Schema({
    weixinName: {
        type: String
    },

    defaultTeamId: {
        type: Schema.Types.ObjectId
    },

    manageTeamList: [
        {
            "teamId": Schema.Types.ObjectId,
            "defaultMapId": Schema.Types.ObjectId,
            "power": Number
        }
    ],

    joinTeamList: [
        {
            "teamId": Schema.Types.ObjectId,
            "defaultMapId": Schema.Types.ObjectId,
            "power": Number
        }
    ]
})

