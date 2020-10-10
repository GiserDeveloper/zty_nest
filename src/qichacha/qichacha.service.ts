
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { QiChaChaSchema } from './schema/qichacha.schema';
// import { TeamuserDto } from './dto/teamuser.dto';
let mongoose=require('mongoose');

@Injectable()
export class QichachaService {
    constructor(
        @InjectModel('QiChaCha') private qichachaModel,
        @InjectModel('OriginInforData') private origininfordataModel
    ) {}

    async getInfoOk(queryname){
        return await this.qichachaModel.findOne({"name":queryname})
    }

    async insertData(inputData,originData){
        var insertInfo = new this.qichachaModel(inputData);
        await (new this.origininfordataModel(originData)).save()
        return await insertInfo.save()
    }
}