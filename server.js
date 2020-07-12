/**
 * Created by dengziyan on 2020/6/13.
 */
const express = require('express');
const expressStatic = require('express-static');
const bodyParser = require('body-parser');
const userRouter = require('./router/userRouter');
const dbconn  = require('./utils/db/index');

var server = express();
server.listen(8080,function(err){
    if(!err){
        console.log('服务器启动成功！');
    }
})

//启动数据连接
dbconn.dbOpen();

//使用bodyparser
server.use(bodyParser.urlencoded({extend:true}));
//使用路由
server.use('/user',userRouter.router);



server.use(expressStatic('./www'));