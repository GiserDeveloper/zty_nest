import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WeiXinArticle } from './schema/weixinarticle.schema'

@Injectable()
export class WeixinarticleService {
    constructor(
        @InjectModel('weixinarticle') private weixinarticleModel
    ) { }

    async create(weixinArticle){
        const createdweixinArticle = new this.weixinarticleModel(weixinArticle)
        return await createdweixinArticle.save()
    }

    async updateweixinarticleById(id, weixinArticle) {
        return await this.weixinarticleModel.findByIdAndUpdate({ _id: id }, weixinArticle, { new: true })
    }

        //查询(分页)
    async findNoticesByPages(query: object, page: number, limit: number) {
        let count = await this.weixinarticleModel.find(query).countDocuments()
        //计算总页数
        let pages = Math.ceil(count / limit);
        //取值不能超过pages
        page = Math.min(page, pages);
        //取值不能小于1
        page = Math.max(page, 1);
        let skip = (page - 1) * limit;

        let res = {}

        let result = await this.weixinarticleModel.find(query).limit(limit).skip(skip)
        res['result'] = result
        res['totalPageNum'] = pages
        res['totalNum'] = count
        return res
    }
}
