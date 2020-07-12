/**
 * Created by dengziyan on 2020/6/18.
 */
const mongoose = require('mongoose');

//定义架构
var schema = new mongoose.Schema({
    username:String,
    age:Number,
    gender:String
})

//生成userModel
var userModel = mongoose.model('user',schema);

exports.userModel = userModel;