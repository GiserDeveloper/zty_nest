import { Controller, Post, Body, Get, Param, Put, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { WeixinarticleService } from './weixinarticle.service'
import { get } from 'mongoose';
import { WeiXinArticleDto, OfficialAccountsDto}  from './dto/weixinarticle.dto'

@Controller('weixinarticle')
@ApiTags('微信文章模块')
export class WeixinarticleController {
    constructor(
        private readonly weixinarticleService: WeixinarticleService
    ){}

    @Post('weixinarticle/create')
    @ApiOperation({summary: '创建微信文章'})
    createZhaoBiao(@Body() weixinarticle:WeiXinArticleDto){
        return this.weixinarticleService.create(weixinarticle);
    }

    @Put('update/:id')
    @ApiParam({
        name: 'id',
        description: '请传入微信文章Id'
    })
    @ApiOperation({summary: '传入招标公告Id修改内容'})
    updateZhaoBiaoById(@Param('id') id, @Body() weixinarticle){
        return this.weixinarticleService.updateweixinarticleById(id, weixinarticle);
    }

    @Get('initDataBase')
    @ApiOperation({summary: '将json数据导入数据库'})
    initDataBase(){
        return this.weixinarticleService.initDataBase()
    }

    @Post('queryPageInfo')
    @ApiOperation({summary: '分页查询微信文章(分页)'})
    getNoticeInfoByPage(@Body() queryBody){
        // let provice = (queryBody.proviceName == "" || !('proviceName' in queryBody) ? {} : {省份:queryBody.proviceName})
        let type = (queryBody.typeName == "" || !('typeName' in queryBody)? {} : {type:queryBody.typeName})
        let page = ('page' in queryBody)? queryBody.page : 1
        let limit = ('limit' in queryBody)? queryBody.limit : 0
        var queryInfo = {}
        if(!('title' in queryBody) || queryBody.title == ''){
            queryInfo = {
                '$or': [
                    { '$and': [
                        type
                    ]}
                ]
            }
        }
        else{
            let title = queryBody.title
            const reg = new RegExp(title, 'i')
            queryInfo = {
                '$or': [
                    { '$and': [
                        {
                            'title': {$regex: reg}
                        },
                        type
                    ]}
                ]
            }
        }

        let res = this.weixinarticleService.findNoticesByPages(queryInfo, page, limit)
        return res

    }

    @Post('newofficialaccounts')
    @ApiOperation({summary: '加入爬取公众号'})
    async NewOfficialAccounts(@Body() name:OfficialAccountsDto){
        console.log(name)
        return await this.weixinarticleService.newofficialaccounts(name)
    }

    @Get('getofficialaccountsList')
    @ApiOperation({summary: '获取公众号名称列表'})
    async GetOfficialAccountsList(){
        return await this.weixinarticleService.getofficialaccountsList()
    }

    @Delete('deleteofficialaccounts/:id')
    @ApiQuery({
        name: 'id',
        description: '公众号ID'
    })
    @ApiOperation({summary: '根据Id移除微信公众号'})
    async DeleteOfficialAccounts(@Query('id') id){
        return await this.weixinarticleService.deleteofficialaccounts(id)
    }
}
