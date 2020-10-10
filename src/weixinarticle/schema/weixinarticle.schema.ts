import { Document, Schema, SchemaType } from 'mongoose';

export const WeiXinArticle = new Schema({
    title: String,
    link: String,
    create_time:String,
    digest : String,
    type: String
})
