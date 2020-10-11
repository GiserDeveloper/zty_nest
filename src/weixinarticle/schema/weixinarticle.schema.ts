import { Document, Schema, SchemaType } from 'mongoose';

export const WeiXinArticle = new Schema({
    title: String,
    link: String,
    time:Number,
    digest : String,
    type: String
})

export const OfficialAccounts = new Schema({
    name: String
})
