import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Notice } from './schema/notice.schema';
import { NoticeZhaoBiaoDto, NoticeBianGengDto, NoticeHouXuanDto, NoticeJieGuoDto, NoticeDto, NoticeQueryDto } from './dto/notice.dto';

@Injectable()
export class NoticeService {
    constructor(
        @InjectModel('Shanxi') private noticeModel: Model<Notice>
    ) { }

    //新增 招标公告
    async createZhaoBiao(zhaobiaoDto: NoticeZhaoBiaoDto) {
        const createdZhaoBiao = new this.noticeModel(zhaobiaoDto);
        return await createdZhaoBiao.save();
    }

    //修改 招标公告
    async updateZhaoBiaoById(id, zhaobiaoDto: NoticeZhaoBiaoDto) {
        return await this.noticeModel.findByIdAndUpdate({ _id: id }, zhaobiaoDto, { new: true })
    }

    //新增 变更公告
    async createBianGeng(biangengDto: NoticeBianGengDto) {
        const createdBianGeng = new this.noticeModel(biangengDto);
        return await createdBianGeng.save();
    }

    //修改 变更公告
    async updateBianGengById(id, biangengDto: NoticeBianGengDto) {
        return await this.noticeModel.findByIdAndUpdate({ _id: id }, biangengDto, { new: true })
    }

    //新增 候选人公告
    async createHouXuan(houxuanDto: NoticeHouXuanDto) {
        const createdHouXuan = new this.noticeModel(houxuanDto);
        return await createdHouXuan.save();
    }

    //修改 候选人公告
    async updateHouXuanById(id, houxuanDto: NoticeHouXuanDto) {
        return await this.noticeModel.findByIdAndUpdate({ _id: id }, houxuanDto, { new: true })
    }

    //新增 结果公告
    async createJieGuo(jieguoDto: NoticeJieGuoDto) {
        const createdJieGuo = new this.noticeModel(jieguoDto);
        return await createdJieGuo.save();
    }

    //修改 结果公告
    async updateJieGuoById(id, jieguoDto: NoticeJieGuoDto) {
        return await this.noticeModel.findByIdAndUpdate({ _id: id }, jieguoDto, { new: true })
    }

    //删除公告
    async deleteNoticeById(id) {
        return await this.noticeModel.deleteOne({ _id: id });
    }

    //删除多条公告
    async deleteNotices(idArr: string[]) {
        return await this.noticeModel.deleteMany({ _id: { $in: idArr } });
    }

    //查询公告(条件查询)[不分页]
    async findNotices(query: object) {
        return await this.noticeModel.find(query);
    }

    //查询公告(分页)
    async findNoticesByPages(query: object, page: number, limit: number) {
        let count = await this.noticeModel.find(query).countDocuments()
        //计算总页数
        let pages = Math.ceil(count / limit);
        //取值不能超过pages
        page = Math.min(page, pages);
        //取值不能小于1
        page = Math.max(page, 1);
        let skip = (page - 1) * limit;

        let res = {}

        let result = await this.noticeModel.find(query).limit(limit).skip(skip)
        res['result'] = result
        res['totalPageNum'] = pages
        res['totalNum'] = count
        return res
    }

    // 查找
    async findNoticeById(id){
        console.log(id)
        return await this.noticeModel.findById(id)
    }
}
