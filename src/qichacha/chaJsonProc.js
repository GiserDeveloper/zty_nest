var fs = require('fs');

// var CompanyInfo = require('./database.js');

// var person= JSON.parse(fs.readFileSync('./工商-人员返回值.json'));
// var project = JSON.parse(fs.readFileSync('./建筑企业-工程项目返回值.json'));
// var stock = JSON.parse(fs.readFileSync('./信息核验-股权穿透返回值.json'));//读取三个json用于调试，实际为传入的三个查询返回值


var JsonProcessing = function(person, project, stock, CompName){

    var inputData = {"name":'content',"person":[], "project":[], "stock": {}}; //设置存入数据库的schema
    inputData.name = CompName;

//先处理工商-人员json
    if(person && person.Result ){

        for(let key in person.Result){
            var temp_person = {"MainPersonName":null, "Job":null};//界定需要取出的值

            temp_person.MainPersonName = person.Result[key].Name;
            temp_person.Job = person.Result[key].Job;

            inputData.person.push(temp_person);     //将取出的结果依次填入schema中
        }
    }
    else{
        console.log("无主要人员信息");
        inputData.person = '无主要人员';
    }

//处理工程项目
    if(project && project.Result ){
        for(let key in person.Result){
            var temp_pro = {"ProjectName":null, "No":null};//界定需要取出的值

            temp_pro.ProjectName = project.Result[key].ProjectName;
            temp_pro.No = project.Result[key].No;
            inputData.project.push(temp_pro);     //将取出的结果依次填入schema中
        }
    }
    else{
        console.log("无工程项目信息");
        inputData.project = '无工程项目';
    }

//处理股权穿透，这个比较复杂，处理一级子节点
    if(stock.Result ){
        var temp_stock = {"StockName":null, "count": null, "Children":[]};

        temp_stock.StockName = stock.Result.Name; //主公司的名字
        temp_stock.count = stock.Result.Count;

        if(stock.Result.Count !== 0){ //判断是否存在Children结点
            for(let key in stock.Result.Children){ //遍历获取所有的一级子节点公司名称
                var temp_child = {"ChildName":null};

                temp_child.ChildName = stock.Result.Children[key].Name;
                temp_stock.Children.push(temp_child);

            }
        }
        inputData.stock = temp_stock;
    }
    else{
        console.log("无股权信息");
        inputData.stock = 'no company';
    }
    console.log('json处理完成');
    return inputData
    // //存入数据库
    // var insertInfo =new CompanyInfo(inputData);
    // insertInfo.save().then(doc => {
    //     console.log(doc);
    // })

    // //console.log(inputData);
    // console.log('数据入库成功')
}

module.exports.JsonProcessing = JsonProcessing;

// var inputData = {"name":'content',"person":[], "project":[], "stock": {}}; //设置存入数据库的schema
//
// //先处理工商-人员json
// if(person && person.Result != null){
//
//     for(let key in person.Result){
//         var temp_person = {"MainPersonName":null, "Job":null};//界定需要取出的值
//
//         temp_person.MainPersonName = person.Result[key].Name;
//         temp_person.Job = person.Result[key].Job;
//
//         inputData.person.push(temp_person);     //将取出的结果依次填入schema中
//     }
// }
// else{
//     console.log("无主要人员信息");
//     inputData.person.push(temp_person);
// }
//
// //处理工程项目
// if(project && project.Result != null){
//     for(let key in person.Result){
//         var temp_pro = {"ProjectName":null, "No":null};//界定需要取出的值
//
//         temp_pro.ProjectName = project.Result[key].ProjectName;
//         temp_pro.No = project.Result[key].No;
//         inputData.project.push(temp_pro);     //将取出的结果依次填入schema中
//     }
// }
// else{
//     console.log("无工程项目信息");
//     inputData.project.push(temp_pro);
// }
//
// //处理股权穿透，这个比较复杂，处理一级子节点
// if(stock.Result ){
//     var temp_stock = {"StockName":null, "count": null, "Children":[]};
//
//     temp_stock.StockName = stock.Result.Name; //主公司的名字
//     temp_stock.count = stock.Result.Count;
//
//     if(stock.Result.Count !== 0){ //判断是否存在Children结点
//         for(let key in stock.Result.Children){ //遍历获取所有的一级子节点公司名称
//             var temp_child = {"ChildName":null};
//
//             temp_child.ChildName = stock.Result.Children[key].Name;
//             temp_stock.Children.push(temp_child);
//
//         }
//     }
//     inputData.stock = temp_stock;
// }
// else{
//     console.log("无股权信息");
//     inputData.stock = temp_stock;
// }
//
// console.log(inputData);

//存入数据库
// var CompanyInfo = require('./database.js');
//
// var insertInfo =new CompanyInfo(inputData);
// insertInfo.save().then(doc => {
//     console.log(doc);
// })
