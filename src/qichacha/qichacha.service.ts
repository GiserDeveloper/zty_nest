
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
    ) {}

    async getInfoOk(queryname){
        return await this.qichachaModel.findOne({"name":queryname})
    }

    async insertData(inputData){
        var insertInfo = this.qichachaModel(inputData);
        return await insertInfo.save()
    }
}