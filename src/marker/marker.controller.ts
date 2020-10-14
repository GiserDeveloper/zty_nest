import { Controller, Post, Body, Get, Param, Put, Delete, UsePipes, ValidationPipe, UseGuards, Query, Request, Response, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import {FileInterceptor} from '@nestjs/platform-express'
import { MarkerService } from './marker.service';
import { MarkerDto, modifyMarkerFieldDto } from './dto/marker.dto';
import { fstat } from 'fs';
// import 'utils';
const formidable = require("formidable");
const path = require("path");
var fs= require('fs')


function delDir(path){
    let files = [];
    if(fs.existsSync(path)){
        files = fs.readdirSync(path);
        files.forEach((file, index) => {
            let curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()){
                delDir(curPath); //递归删除文件夹
            } else {
                fs.unlinkSync(curPath); //删除文件
            }
        });
        fs.rmdirSync(path);
    }
}

@Controller('marker')
@ApiTags('标记点模块')
export class MarkerController {
    constructor(
        private readonly markerService: MarkerService
    ) { }

    @Post()
    @ApiOperation({ summary: '创建新标记点' })
    createMarker(@Body() markerDto: MarkerDto) {
        return this.markerService.create(markerDto);
    }

    @Get('findMarkersByLayerName/:layerName')
    @ApiParam({
        name: 'layerName',
        description: '请传入图层名称'
    })
    @ApiOperation({ summary: '根据图层查找点' })
    getUserById(@Param('layerName') layerName) {
        return this.markerService.findMarkerByLayerName(layerName);
    }

    @Get()
    @ApiOperation({ summary: '查找全部点及其详细信息' })
    getAllMarkers() {
        return this.markerService.findAllMarkers();
    }

    @Get('findMarkerByMultiLayer')
    @ApiQuery({
        name: 'layerNames',
    })
    @ApiOperation({
        summary: '根据一组图层参数查询点数据'
    })
    getMarkersByMultiLayers(@Query('layerNames') layerNames) {
        // 字符串转数组
        let queryArr = JSON.stringify(layerNames.split(','));
        return this.markerService.findMarkerByMultiLayerNames(queryArr);
    }

    @Get('findMarkerActive')
    @ApiOperation({
        summary: '查询处于激活状态的点数据'
    })
    getMarkersActive() {
        return this.markerService.findMarkerActive();
    }

    @Get('detail/:id')
    @ApiParam({
        name: 'id',
        description: '请传入markerID'
    })
    @ApiOperation({
        summary: '根据ID查询点的详细信息'
    })
    queryMarkerByID(@Param('id') id) {
        return this.markerService.queryMarkerByID(id);
    }

    // 新增点字段
    @Post('addMarkerField')
    @ApiOperation({
        summary: '新增点字段'
    })
    addLayerField(@Body() addMarkerFieldContent: modifyMarkerFieldDto) {
        return this.markerService.addMarkerField(addMarkerFieldContent, addMarkerFieldContent.modifyLayerId)
    }

    // 删除点字段
    @Post('deleteMarkerField')
    @ApiOperation({
        summary: '删除点字段'
    })
    deleteMarkerField(@Body() deleteMarkerFieldContent: modifyMarkerFieldDto){
        return this.markerService.deleteMarkerField(deleteMarkerFieldContent, deleteMarkerFieldContent.modifyLayerId)
    }

    // 修改点数据-部分字段
    @Put('modify')
    @ApiQuery({
        name: 'markerId',
        description: '请传入待修改点名字'
    })
    @ApiOperation({ summary: '修改点数据' })
    modifyMarker(@Query('markerId') query, @Body() updateContent: MarkerDto) {
        return this.markerService.modifyMarker(query, updateContent);
    }

    // 根据图层名称修改点字段
    @Put('modifyByLayer')
    @ApiQuery({
        name: 'layerName',
        description: '请传入修改的图层名字'
    })
    @ApiOperation({ summary: '修改点数据-通过图层' })
    modifyMarkerByLayer(@Query('layerName') query, @Body() updateContent: MarkerDto) {
        return this.markerService.modifyMarkerByLayerName(query, updateContent);
    }


    @Delete(':markerId')
    @ApiParam({
        name: 'markerId',
        description: '请传入点id'
    })
    @ApiOperation({summary: '传入点id删除点'})
    deleteMarkerByName(@Param('markerId') markerId){
        return this.markerService.deleteMarker(markerId);
    }

    @Delete('multi/:layerId')
    @ApiParam({
        name: 'layerId',
        description: '请传入图层id'
    })
    @ApiOperation({summary: '传入图层id删除点'})
    deleteMarkersByLayerId(@Param('layerId') layerId){
        return this.markerService.deleteMarkers(layerId);
    }  

    @Get('test')
    @ApiOperation({summary: 'test'})
    test(){
        return this.markerService.test()
    }

    // // 新增点字段
    // @Post('addMarkerField2')
    // @ApiOperation({
    //     summary: '新增点字段'
    // })
    // addLayerField2(@Body() addMarkerFieldContent: modifyMarkerFieldDto) {
    //     return this.markerService.addMarkerField2(addMarkerFieldContent, addMarkerFieldContent.modifyLayerName)
    // }


    @Get('testZty/:mapId')
    @ApiParam({
        name: 'mapId',
        description: '请传入mapId'
    })
    @ApiOperation({
        summary: '测试'
    })
    testZty(@Param('mapId') mapId){
        return this.markerService.testZTY(mapId)
    }

    @Post('testUpload')
    async testUpload(@Request() req, @Response() res, @Query('markerId') markerId){
        var form = new formidable.IncomingForm();
        form.keepExtensions = true;
        form.multiples = true;
        var upLoadPath = path.join(__dirname,'../../public/'+ markerId);
        // fs.mkdir(upLoadPath,(err)=>{})
        await fs.exists(upLoadPath, function(exists){
            if(!exists){
                fs.mkdir(upLoadPath,(err)=>{})
            }
        })
        form.uploadDir = upLoadPath
        let tmp = await new Promise((resolve, reject)=>{
            form.parse(req, (err, fields, files)=>{
                if(err){
                    reject(err)
                }
                else{
                    resolve(fields)
                }    
                //form.uploadDir =path.join(__dirname,"my/" + files['markerId']);
            })
        })
        // console.log('ok')
        res.send(tmp)
    }

    @Post('testUpload2')
    async testUpload2(@Request() req, @Response() res, @Query('markerId') markerId, @Query('imgUrl') imgUrl){
        var form = new formidable.IncomingForm();
        form.keepExtensions = true;
        form.multiples = true;
        var upLoadPath = path.join(__dirname,'../../public/'+ markerId);
        //fs.mkdir(upLoadPath,(err)=>{})
        form.uploadDir = upLoadPath
        let tmp = await new Promise((resolve, reject)=>{
            form.parse(req, (err, fields, files)=>{
                if(err){
                    reject(err)
                }
                else{
                    resolve(fields)
                }    
                //form.uploadDir =path.join(__dirname,"my/" + files['markerId']);
            })
        })
        // console.log('ok')
        res.send(tmp)
    }

    @Get('deleteImg')
    async deleteImg(@Query('markerId') markerId, @Query('imgUrl') imgUrl){
        if(imgUrl.indexOf(':3000')!=-1){
            // 删除服务器的图片
            let filePath = path.join(__dirname, '../../public/' + markerId) +'/' + imgUrl.split(markerId + '/')[1]
            return fs.unlinkSync(filePath); //删除文件
        }
        return '图片不存在'
    }

    @Get('testDownLoad')
    async testDownLoad(@Query('markerId') markerId){
        let downLoadPath = path.join(__dirname, '../../public/' + markerId);
        let imgUrls = fs.readdirSync(downLoadPath);
        let imgUrlsRes = []
        for(let imgUrl of imgUrls){
            let tmp = 'http://localhost:3000/public' + '/' + markerId + '/' + imgUrl
            imgUrlsRes.push(tmp)
        }
        return imgUrlsRes
    }

    //下载数据
    @Get('download/:layer_id/:path')
    @ApiParam({
        name:'layer_id',
        description:'请输入图层编号'
    })
    @ApiParam({
        name:'path',
        description:'请输入保存路径'
    })
    @ApiOperation({summary:'导出图层所有记录至excel表格'})
    donwloadfile(@Param() param){
        console.log('文件导出功能执行成功!' )
        return this.markerService.excelExport(param.layer_id, null)
        // return this.markerService.excelExport(param.layer_id, null)
    }

    //上传数据
    @Post('upload/:layer_id')
    @ApiParam({
        name:'layer_id',
        description:'请输入图层编号'
    })
    @ApiOperation({summary:'导入excel记录'})
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file, @Param() param){
      console.log('文件导入功能执行成功!')
      return this.markerService.excelImport(file.buffer, param.layer_id)
    }
}

