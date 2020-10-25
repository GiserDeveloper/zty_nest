import { Injectable } from '@nestjs/common';
const execSync = require('child_process').execSync;

const util = require('util');
const exec = util.promisify(require('child_process').exec);

var path = require('path');

const iconv = require('iconv-lite');

@Injectable()
export class BaiduService {
    async searchProject(keywords,site,pn){
        // console.log(module.filename)
        // console.log(keywords,site,pn)
        // const output = execSync('python D:/zty_nest/src/baidu/baidu.py '+ keywords + ' ' + site + ' ' + pn)
        const { stdout, stderr } = await exec('python D:/zty_nest/src/baidu/baidu.py '+ keywords + ' ' + site + ' ' + pn);
        // console.log(stdout)
        // console.log(JSON.parse('{"name": 1}'))
        // console.log(iconv.decode(stdout,'gb2312').toString())
        return JSON.parse(iconv.decode(stdout,'gb2312').toString())
        // return '2113'
        // console.log(output.toString())
        // console.log('over')
    }
}
