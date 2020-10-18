import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WeiXinArticle } from './schema/weixinarticle.schema'
var fs = require ('fs')

let mongoose=require('mongoose');

@Injectable()
export class WeixinarticleService {
    constructor(
        @InjectModel('weixinarticle') private weixinarticleModel,
        @InjectModel('officialaccounts') private officialaccountsModel
    ) { }

    async create(weixinArticle){
        const createdweixinArticle = new this.weixinarticleModel(weixinArticle)
        return await createdweixinArticle.save()
    }

    async newofficialaccounts(name){
        //加入新公众号
        console.log(name)
        const createofficialaccounts = new this.officialaccountsModel(name)
        return await createofficialaccounts.save()
    }

    async deleteofficialaccounts(id){
        //通过id删除公众号
        return await this.officialaccountsModel.deleteOne({_id: mongoose.Types.ObjectId(id)})
    }

    async getofficialaccountsList(){
        //获取公众号列表
        return await this.officialaccountsModel.find()
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

        let result = await this.weixinarticleModel.find(query).sort({'time': -1}).limit(limit).skip(skip)
        res['result'] = result
        res['totalPageNum'] = pages
        res['totalNum'] = count
        return res
    }

    async initDataBase(){
        let nameList = ['基建通', '超级建筑', '铁路建设规划']
        for(let i = 0; i < nameList.length; i++){
            let url = 'D:/zty_nest/src/weixinarticle/'+nameList[i]+'.json'
            var self = this
            let f = fs.readFile(url, "utf-8", function(err, data){
                // console.log(data);
                let j = JSON.parse(data);
                j.forEach(element => {
                    element.type = nameList[i]
                    let data = new self.weixinarticleModel(element);
                    data.save()
                },this);
                // console.log(j);
            })
        } 

    }
}
