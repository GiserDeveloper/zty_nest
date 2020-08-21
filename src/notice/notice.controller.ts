import { Controller, Post, Body, Get, Param, Put, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { NoticeService } from './notice.service';
import { NoticeZhaoBiaoDto, NoticeBianGengDto, NoticeHouXuanDto, NoticeJieGuoDto, NoticeQueryDto, NoticeDto } from './dto/notice.dto';

@Controller('notice')
@ApiTags('通知公告模块')
export class NoticeController {
    constructor(
        private readonly noticeService: NoticeService
    ){}

    @Post('zhaobiao')
    @ApiOperation({summary: '创建招标公告'})
    createZhaoBiao(@Body() zhaobiaoDto: NoticeZhaoBiaoDto){
        return this.noticeService.createZhaoBiao(zhaobiaoDto);
    }

    @Post('biangeng')
    @ApiOperation({summary: '创建变更公告'})
    createBianGeng(@Body() biangengDto: NoticeBianGengDto){
        return this.noticeService.createBianGeng(biangengDto);
    }

    @Post('houxuan')
    @ApiOperation({summary: '创建候选人公告'})
    createHouXuan(@Body() houxuanDto: NoticeHouXuanDto){
        return this.noticeService.createHouXuan(houxuanDto);
    }

    @Post('jieguo')
    @ApiOperation({summary: '创建结果公告'})
    createJieGuo(@Body() jieguoDto: NoticeJieGuoDto){
        return this.noticeService.createBianGeng(jieguoDto);
    }

    @Put(':zhaobiaoId')
    @ApiParam({
        name: 'zhaobiaoId',
        description: '请传入招标公告Id'
    })
    @ApiOperation({summary: '传入招标公告Id修改内容'})
    updateZhaoBiaoById(@Param('zhaobiaoId') id, @Body() zhaobiaoDto: NoticeZhaoBiaoDto){
        return this.noticeService.updateZhaoBiaoById(id, zhaobiaoDto);
    }

    @Put(':houxuanId')
    @ApiParam({
        name: 'houxuanId',
        description: '请传入候选人公告Id'
    })
    @ApiOperation({summary: '传入候选人公告Id修改内容'})
    updateHouXuanById(@Param('houxuanId') id, @Body() houxuanDto: NoticeHouXuanDto){
        return this.noticeService.updateHouXuanById(id, houxuanDto);
    }

    @Put(':biangengId')
    @ApiParam({
        name: 'biangengId',
        description: '请传入变更公告Id'
    })
    @ApiOperation({summary: '传入变更公告Id修改内容'})
    updateBianGengById(@Param('biangengId') id, @Body() biangengDto: NoticeBianGengDto){
        return this.noticeService.updateBianGengById(id, biangengDto);
    }

    @Put(':jieguoId')
    @ApiParam({
        name: 'jieguoId',
        description: '请传入结果公告Id'
    })
    @ApiOperation({summary: '传入结果公告Id修改内容'})
    updateJieGuoById(@Param('jieguoId') id, @Body() jieguoDto: NoticeJieGuoDto){
        return this.noticeService.updateJieGuoById(id, jieguoDto);
    }

    @Delete(':noticeId')
    @ApiParam({
        name: 'noticeId',
        description: '请传入通知公告Id'
    })
    @ApiOperation({summary: '传入通知公告Id删除公告'})
    deleteNoticeById(@Param('noticeId') id){
        return this.noticeService.deleteNoticeById(id);
    }

    @Get('queryInfo')
    @ApiOperation({summary: '传入查询参数查询公告'})
    getNoticeInfo(@Query() query: NoticeQueryDto){
        let provice = (query.proviceName == "" || !('proviceName' in query) ? {} : {省份:query.proviceName})
        let type = (query.typeName == "" || !('typeName' in query)? {} : {类型:query.typeName})

        let queryInfo = {
            '$or': [
                { '$and': [
                    provice,
                    type
                ]}
            ]
        }

        return this.noticeService.findNotices(queryInfo)
    }

}
