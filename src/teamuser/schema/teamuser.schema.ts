import { Document, Schema, SchemaType } from 'mongoose';

export const TeamuserSchema = new Schema({
    weixinName: {
        type: String
    },

    password: {
        type: String
    },

    defaultTeamId: {
        type: Schema.Types.ObjectId
    },
    
    careProjectList:[
        {
            'projectName': String,
            'latestDate': String
        }
    ],


    role: {
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

