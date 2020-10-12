import { Model, Mongoose } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Marker, MarkerSchema } from './schema/marker.schema';
import { MarkerDto, modifyMarkerFieldDto } from './dto/marker.dto';

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

}
