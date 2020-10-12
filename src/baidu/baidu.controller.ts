import { ApiTags, ApiOperation, ApiQuery, ApiParam } from '@nestjs/swagger';
import { Controller, Get, Query, Param} from '@nestjs/common';
import { BaiduService } from './baidu.service';


@Controller('baidu')
@ApiTags('百度搜索模块')
export class BaiduController {
    constructor(private readonly baiduService: BaiduService) {}

    @Get('searchProject')
    @ApiQuery({
        name: 'keywords',
        description: '关键词'
    })
    @ApiQuery({
        name: 'site',
        description: '域名'
    })
    @ApiQuery({
        name: 'pn',
        description: '页码'
    })
    @ApiOperation({summary: '返回百度搜索相关项目的结果'})
    async searchProject(@Query('keywords') keywords,@Query('site') site,@Query('pn') pn){
        return await this.baiduService.searchProject(keywords,site,pn)
    }
}
