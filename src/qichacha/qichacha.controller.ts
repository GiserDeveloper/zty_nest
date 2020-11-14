// import { Controller } from '@nestjs/common';

// @Controller('qichacha')
// export class QichachaController {}

import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { Controller, Get, Query} from '@nestjs/common';
import { QichachaService } from './qichacha.service';
import{ chaAPI } from './chaAPI';
// var CompanyInfo = require('./database.js');


@Controller('qichacha')
@ApiTags('企业信息模块')
export class QichachaController {
  constructor(private readonly qichachaService: QichachaService) {}

  @Get('keyword')
  @ApiQuery({
    name: 'name',
    description: '查询企业的名称'
  })
  @ApiOperation({summary: '查询企业信息'})
  async getInfo(@Query() query){
    let databaseres = await this.qichachaService.getInfoOk(query.name)
    if(!databaseres){
        let qichachares = await chaAPI(query.name)
        console.log(qichachares)
        return await this.qichachaService.insertData(qichachares.inputData, qichachares.originData)
    }
    return databaseres
    //判断是否存在数据库内
    // CompanyInfo.findOne({"name":query.name}, function(err, result) {
    //     if(err) throw err;

    //     if(!result){
    //       chaAPI(query.name);
    //       console.log( '查询公司为：' + query.name + '且保存成功');
    //     }
    //     else{
    //       console.log( '查询公司已存在数据库内');
    //     }
    // })

    // return '处理完毕'
  }
}
