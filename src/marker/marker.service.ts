import { Model, Mongoose } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Marker, MarkerSchema } from './schema/marker.schema';
import { MarkerDto, modifyMarkerFieldDto } from './dto/marker.dto';
import { utils, read, writeFile, write } from 'xlsx'


import { Counter } from 'src/counter/schema/counter.schema';
import { Layer } from 'src/layer/schema/layer.schema';
import { Map } from 'src/map/schema/map.schema';

let mongoose=require('mongoose');

@Injectable()
export class MarkerService {
    constructor(
        @InjectModel('Marker') private markerModel: Model<Marker>,
        @InjectModel('Counter') private counterModel: Model<Counter>,
        @InjectModel('Layer') private layerModel: Model<Layer>,
        @InjectModel('Map') private mapModel: Model<Map>
    ) { }

    // 返回带自增id的数据
    async create(markerDto: any) {
        try {
            let counter = await this.counterModel.findOneAndUpdate(
                { _id: 'markerIdSeqGenerator' },
                { $inc: { seq: 1 } },
                {
                    new: true,
                    upsert: true
                }
            )
            markerDto.id = counter.seq;
            markerDto.layer_id = mongoose.Types.ObjectId(markerDto.layer_id)
            try {
                return await this.markerModel.create(markerDto)
            } catch (error) {

            }
        } catch (error) {

        }
    }

    // 查询给定图层name的点
    async findMarkerByLayerName(layerId) {
        let layerID = mongoose.Types.ObjectId(layerId)
        return await this.markerModel.find({ layer_id: layerID });
    }

    // 查找所有的点
    async findAllMarkers() {
        return await this.markerModel.find();
    }

    // 查询给定一组图层name的点
    async findMarkerByMultiLayerNames(layerNames) {
        const result = [];
        await this.markerModel.find(null, (err, doc) => {
            doc.map((value) => {
                if (layerNames.includes(value.layer_name)) {
                    result.push(value);
                }
            })
        })
        return result;
    }

    // 查询 处于激活状态的 地图 的 可见的图层的点数据
    async findMarkerActive() {
        return await this.markerModel.aggregate([
            {
                $lookup: {
                    from: "layers",
                    localField: "layer_name",
                    foreignField: "layerName",
                    as: "layerInfo"
                }
            },
            {
                $lookup: {
                    from: "maps",
                    localField: "map_name",
                    foreignField: "mapName",
                    as: "mapInfo"
                },
            },
            {
                $match: {
                    'layerInfo.isVisible': true,
                    'mapInfo.isActive': true
                }
            }
        ])
    }

    // 根据点的ID查询点信息
    async queryMarkerByID(id) {
        let Id = Number(id)
        return await this.markerModel.aggregate([
            {
                $match:{
                    id: Id
                }
            },
            {
                $lookup: {
                    from: "layers",
                    localField: "layer_id",
                    foreignField: "_id",
                    as: "layerInfo"
                }
            }
        ]);
    }

    // 新增点的字段
    async addMarkerField(addMarkerProperty, modifyLayerId) {
        let modifyLayerID = mongoose.Types.ObjectId(modifyLayerId)
        // 批量更新
        let tmp = {}
        tmp[`markerField.${addMarkerProperty.modifyFieldName}`] = addMarkerProperty.modifyFieldNameCon
        return await this.markerModel.updateMany({
            layer_id: modifyLayerID
        }, tmp, (err) => { })
    }

    async addMarkerField2(addMarkerProperty, modifyLayerName){
        // 批量更新
        let tmp = {}
        tmp[addMarkerProperty.modifyFieldName] = mongoose.Types.ObjectId(addMarkerProperty.modifyFieldNameCon)
        console.log(tmp)
        console.log(mongoose.Types.ObjectId.isValid(tmp[addMarkerProperty.modifyFieldName]))
        return await this.markerModel.updateMany({
            layer_name: modifyLayerName
        }, {
            $set: tmp
        }, (err) => { })
    }

    // 删除点的字段
    async deleteMarkerField(deleteMarkerProperty, modifyLayerId){
        let modifyLayerID = mongoose.Types.ObjectId(modifyLayerId)
        let unset = {}
        unset[`markerField.${deleteMarkerProperty.modifyFieldName}`] = ""
        return await this.markerModel.updateMany({
            layer_id: modifyLayerID
        }, {
            $unset: unset
        })
    }

    // 修改点信息-字段
    async modifyMarker(query, updateContent) {
        updateContent.layer_id = mongoose.Types.ObjectId(updateContent.layer_id)
        return await this.markerModel.findOneAndUpdate(
            {
                id: query
            },
            {
                $set: updateContent
            },
            {
                new: true
            }
        )
    }

    // 根据图层信息修改点字段
    async modifyMarkerByLayerName(query, updateContent) {
        return await this.markerModel.updateMany(
            {
                layer_name: query
            },
            {
                $set: updateContent
            },
            {
                new: true
            }
        )
    }

    // 删除点
    async deleteMarker(markerId){
        return await this.markerModel.deleteOne({
            id: markerId
        })
    }

    // 根据图层删除点d
    async deleteMarkers(layerId){
        let layerID = mongoose.Types.ObjectId(layerId)
        return await this.markerModel.deleteMany({
            layer_id: layerID
        })
    }

    // 求markerCount
    async test(){
        return await this.markerModel.aggregate(
            [
                {
                    $group:{
                        _id: {
                            layerName: '$layer_name'
                        },
                        count: {
                            $sum: 1
                        }
                    }
                }
            ]
        )
    }

    // 返回激活的地图的layer-marker数据
    testZTY(mapId){
        let mapID =mongoose.Types.ObjectId(mapId)
        return this.layerModel.aggregate([
            {
                $match:{
                    map_id : mapID
                }
            },
            {
                $lookup: {
                    from: "markers",
                    localField: "_id",
                    foreignField: "layer_id",
                    as: "markerList"
                }
            }
        ])
    }

    // 根据点ID返回点所带的图片
    //Excel格式化导出数据（yzy）
    ////获取数据
    async getData(layerId) {
        let layerID = mongoose.Types.ObjectId(layerId)
        let resultData = []

        await this.markerModel.find({layer_id:layerID}, (err, data) => { //根据layerId筛选数据
            if(err) throw(err)
            if(data.length == 0) return resultData;  //若无记录则跳出

            for (let i in data){ //第一层循环，取出数组中每一条记录
                let data_object = data[i].toObject()
                let temp_result = {} //整理格式后的记录

                delete data_object['_id']    //删除不要的两个字段
                delete data_object['layer_id']
                                
                //直接写死，不用循环
                temp_result['标记名称'] = data_object.markerName
                temp_result['经度'] = data_object.latitude
                temp_result['纬度'] = data_object.longitude
                for(let key in data_object.markerField){   //展开markerFild
                    temp_result[key] = data_object['markerField'][key]
                }
                            
                resultData.push(temp_result)
            }
        })
        return resultData
    }

    ////导出函数
    async excelExport(layerId){
        let json =await this.getData(layerId)

        if(json.length == 0){
            return '该图层无记录可导出!'
        }

        let ss = utils.json_to_sheet(json) //通过工具将json转表对象
        let ref = ss['!ref'] //获取表的范围
        let workbook = { //定义操作文档
            SheetNames:['nodejs-sheetname'], //定义表明
            Sheets:{
                'nodejs-sheetname':Object.assign({},ss,{'!ref':ref}) //表对象[注意表名]
            },
        }

        const excelFIle = write(workbook,{
            bookType: 'xlsx', // 输出的文件类型
            type: 'buffer', // 输出的数据类型
            compression:true // 关闭zip压缩
        })
        console.log(excelFIle)

        return excelFIle

    }
    //Excel格式化导入数据（yzy）

    ////判断记录是否存在数据库中
     IsExisting(record) {
        return new Promise((resolve,reject) => {
            this.markerModel.findOne({'markerName':record.markerName}, (err, result) => {
                if(err) reject(err);
    
                if(!result){
                    resolve(false);   //若无记录则返回false
                }
                else{
                    resolve(true);  //若有记录则返回false
                }
            })
        })
    }

    ////根据layer_id获取layer图层的field格式
    async getLayerForm(layerId){
        return new Promise((resolve, reject) => {
            this.layerModel.findOne({_id:layerId}, (err, doc) => {
                if(err) reject(err)
                resolve(doc.fieldList)
            })
        })
    }

    ////导入函数
    async excelImport(file, layerId){
        let workbook = read(file, {type:"buffer"})
        let sheetNames = workbook.SheetNames; //获取表名
        let sheet = workbook.Sheets[sheetNames[0]]; //通过表名得到表对象
        let data =utils.sheet_to_json(sheet); //通过工具将表对象的数据读出来并转成json

        if( !data[0] || !data[0]['标记名称'] ){
            return '请输入正确的xlsx文件！'
        }

        var insertCount = 0; //新增记录计数器
        var sum = 0;   //总数计数器
        var updataCount = 0; //更新计数器
        let color = ['红色.png','蓝色.png','绿色.png','粉色.png','白色.png','黑色.png','橙色.png','黄色.png'] //icon颜色数组

        let layerForm = {} //图层filed格式
        layerForm = await this.getLayerForm(mongoose.Types.ObjectId(layerId))

        //处理输入文件的格式
        for(let i in data){
            let data_object = {}
            data_object = data[i]
            let temp_result = {}
            temp_result['markerField'] = {}

            //获取文件的信息
            for(let key in data_object){
                if(key == '标记名称'){
                    temp_result['markerName'] = data_object[key]
                }
                else if(key == '经度'){
                    temp_result['latitude'] = data_object[key]
                }
                else if(key == '纬度'){
                    temp_result['longitude'] = data_object[key]
                }
                else if(key.indexOf('图片') * key.indexOf('添加人员') * key.indexOf('添加时间') * key.indexOf('样式') != 1){
                   // delete data_object[key]
                   continue
                }
                else{
                    for(let key1 in layerForm){
                        if( key == layerForm[key1]){  //如果记录中的键存在于layer的列表中
                            temp_result['markerField'][key] = data_object[key]
                        }
                        else{
                            continue
                        }
                    }
                }
            }
            //补充文件缺失的字段
            if( !temp_result['markerName'] ) temp_result['markerName'] = '';
            if( !temp_result['latitude'] ) temp_result['latitude'] = 0;
            if( !temp_result['longitude'] ) temp_result['longitude'] = 0;
            for(let key in layerForm){
                if( !temp_result['markerField'][ layerForm[key] ] ) {
                    temp_result['markerField'][ layerForm[key] ] = ''
                }
            }            
            //固定字段赋值
            temp_result['width'] = 30
            temp_result['height'] = 30
            temp_result['layer_id'] = mongoose.Types.ObjectId(layerId)
            temp_result['iconPath'] = '../../icons/' + color[Math.floor(Math.random()*8)] 
            temp_result['callout'] = {
                content: temp_result['markerName'],
                display: 'BYCLICK'
            }
            

        if(await this.IsExisting(temp_result)){ //更新记录，但是不改变id
            this.markerModel.updateOne(
                {markerName:temp_result['markerName']},
                {$set:temp_result},
                (err,doc) => {
                    if(err) throw err
                    console.log(doc)
                }
            )
            updataCount++
        }
        else{
            this.create(temp_result)
            insertCount++
            } 
        }
        sum = insertCount + updataCount
        //
        return '共处理记录'+sum+'条\r\n'+'更新记录'+ updataCount +'条\r\n'+'新增记录'+ insertCount +'条\r\n'
    }

}
