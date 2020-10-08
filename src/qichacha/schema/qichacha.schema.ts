import { Document, Schema, SchemaType } from 'mongoose';

export const QiChaChaSchema = new Schema({
    name: String,
    person: Object,
    project:Object,
    stock : Object
})
