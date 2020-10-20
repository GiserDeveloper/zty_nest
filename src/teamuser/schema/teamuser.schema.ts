import { Document, Schema, SchemaType } from 'mongoose';

export const TeamuserSchema = new Schema({
    weixinName: {
        type: String
    },

    defaultTeamId: {
        type: Schema.Types.ObjectId
    },

    role: {
        type: String
    },

    password: {
        type: String
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

