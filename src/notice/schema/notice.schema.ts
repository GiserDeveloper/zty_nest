import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Notice extends Document {
    @Prop()
    公告标题: string;

    @Prop()
    发布时间: string;

    @Prop()
    公告链接: string;

    @Prop()
    招标人: string;

    @Prop()
    项目概况: string;

    @Prop()
    项目详细地址: string;

    @Prop()
    标书下发时间: string;

    @Prop()
    开标时间: string;

    @Prop()
    工程名称: string;

    @Prop()
    工程地址: string;

    @Prop()
    候选人1: string;

    @Prop()
    候选人2: string;

    @Prop()
    候选人3: string;

    @Prop()
    中标单位: string;

    @Prop()
    省份: string;

    @Prop()
    类型: string;
}

export const NoticeSchema = SchemaFactory.createForClass(Notice);