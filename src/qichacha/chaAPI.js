//当前Demo以工商接口中，模糊搜索为例
//接口请求示例为：https://pro.qichacha.com/api/yj/ECIV4/SearchWide?key=AppKey&keyword=苏州朗动网络科技有限公司
//保存拉取的json文件
var  fs = require('fs');

var md5=require('md5-node'); //载入加密库

//我的key
// let Userkey='61c3a1a289b04309be2184549874ecc9';  //key
//
// let SecretKey='AE8DA5F4D62C914D9FE908D729D46936';   //密钥

//老师的key

let Userkey='4dc50bfb09384cfb9acaeef494ca6291';  //key

let SecretKey='248AA6BEB3D201A47833E0B237EAB52B';   //密钥
//以上为请求头部分，下面是通信api的部分


var http = require("http");
var querystring = require('querystring');



let request = (params) => {
    return new Promise((resolve, reject)=>{
        let req = http.request(params, res => {
            var data;
            res.setEncoding("utf8")
            res.on("data", chunk => {
                data = chunk;
            })
            res.on('end',() => {
                resolve(data);
            })
        })
        req.on("error", e => {
            reject(e)
        })
        req.end()
    })
}

var JsonProc = require('./chaJsonProc');

async function UseAPI(CompName) {
    let TimeSpan=Math.round(new Date /1000);  //目测是对称加密的解密参数
    let Token=md5(Userkey + TimeSpan + SecretKey).toUpperCase();   //加密方法，Token为最终密钥


    var data1 = {key:Userkey,searchKey:CompName,pageSize:'20'}; //此处填入搜索内容
    var content1 = querystring.stringify(data1); //格式化查询语句

    var option_person = {
        hostname:'api.qichacha.com',
        method:'GET',
        path:'/ECIEmployee/GetList?'+content1,
        headers:{
            "Token": Token,
            "Timespan":TimeSpan
        }
    };

    var data2 = {key:Userkey,searchKey:CompName,pageSize: '19'}; //此处填入搜索内容
    var content2 = querystring.stringify(data2); //格式化查询语句
    var option_project = {
        hostname:'api.qichacha.com',
        method:'GET',
        path:'/BuildingProject/GetList?'+content2,
        headers:{
        "Token": Token,
        "Timespan":TimeSpan
        }
    };

    var data3 = {key:Userkey,keyWord:CompName,level:'1'}; //此处填入搜索内容
    var content3 = querystring.stringify(data3); //格式化查询语句
    var option_stock = {
        hostname:'api.qichacha.com',
        method:'GET',
        path:'/EquityThrough/GetEquityThrough?'+content3,
        headers:{
        "Token": Token,
        "Timespan":TimeSpan
        }
    }

    var person = await request(option_person);  console.log('person:' + person);   let Person = JSON.parse(person);
    
    var project = await request(option_project);console.log('project:' + project); let Project = JSON.parse(project);
    var stock = await request(option_stock);    console.log('stock:' + stock);     let Stock = JSON.parse(stock);
     //var stock = '{"Name":"假的"}';    console.log('stock:' + stock);     let Stock = JSON.parse(stock);
    return JsonProc.JsonProcessing(Person, Project, Stock, CompName);//数据传入JSON进行处理
}

exports.chaAPI = UseAPI;



