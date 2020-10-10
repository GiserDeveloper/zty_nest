import { Controller, Post, Body, Get, Param, Put, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { WeixinarticleService } from './weixinarticle.service'

@Controller('weixinarticle')
@ApiTags('微信文章模块')
export class WeixinarticleController {
    constructor(
        private readonly weixinarticleService: WeixinarticleService
    ){}

    @Post('weixinarticle/create')
    @ApiOperation({summary: '创建微信文章'})
    createZhaoBiao(@Body() weixinarticle){
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

    @Post('queryPageInfo')
    @ApiOperation({summary: '分页查询微信文章(分页)'})
    getNoticeInfoByPage(@Body() queryBody){
        // let provice = (queryBody.proviceName == "" || !('proviceName' in queryBody) ? {} : {省份:queryBody.proviceName})
        let type = (queryBody.typeName == "" || !('typeName' in queryBody)? {} : {type:queryBody.typeName})

        let page = ('page' in queryBody)? queryBody.page : 1
        let limit = ('limit' in queryBody)? queryBody.limit : 0

        let queryInfo = {
            '$or': [
                { '$and': [
                    type
                ]}
            ]
        }

        let res = this.weixinarticleService.findNoticesByPages(queryInfo, page, limit)
        return res

    }

}
