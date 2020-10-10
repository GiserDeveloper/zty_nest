import { Document, Schema, SchemaType } from 'mongoose';

export const QiChaChaSchema = new Schema({
    name: String,
    information: Object,
    person: Object,
    project:Object,
    stock : Object
})
