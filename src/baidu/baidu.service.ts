import { Injectable } from '@nestjs/common';
const execSync = require('child_process').execSync;

var path = require('path');

const iconv = require('iconv-lite');

@Injectable()
export class BaiduService {
    async searchProject(keywords,site,pn){
        console.log(module.filename)
        console.log(keywords,site,pn)
        const output = execSync('python D:/imooc/NestJS/zty-project/src/baidu/baidu.py '+ keywords + ' ' + site + ' ' + pn)
        // console.log(JSON.parse('{"name": 1}'))
        // console.log(iconv.decode(output,'gb2312').toString())
        return JSON.parse(iconv.decode(output,'gb2312').toString())
        // return '2113'
        // console.log(output.toString())
        // console.log('over')
    }
}
