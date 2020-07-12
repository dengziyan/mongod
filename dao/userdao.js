/**
 * Created by dengziyan on 2020/6/18.
 */
const user = require('../model/userModel');

var userModel = user.userModel;

//find
async function findAllUsers(){
    //采用回调函数取数
    try{
        var data = await userModel.find({});
        console.log('dao:'+data);
        return{success:true,users:data};
    }catch(err){
        return{success:false,msg:'数据出错'}
    };
};

//修改方法
async  function  updateUser(user){
    //确定唯一：username
    try{
        var data = await userModel.update({username:user.username},{$set:{age:user.age,gender:user.gender}})
        //{"nMatched":0,"nUpserted":0,"nModified":0}
        if(data.nMatched==0){
            return{success:false,msg:'The user'+user.username+'is not exist!..'};
        }else{
            if(data.nModified==0){
                return{success:false,msg:'modefied error'};
            }else{
                return{success:true,msg:'modefied success'};
            }
        }
    }catch(err) {
        return {success:false,msg:err};
    }

}

//检查用户的存在性
async function checkUserExist(username){
    var user = await userModel.findOne({username:username});
    if(user==[]||user==null||user==undefined){
        return {success:false,msg:'not found'};
    }else{
        return {success:true,msg:'Be found'};
    }
}

//添加user 方法
async function addUser(user){
    try{
        var user = await userModel.create(user);
        if(user==null||user==null||user==undefined){
            return {success:false,msg:'add is error'}
        }else{
            return {success:true,user:user};
        }
    }catch (e){
        return {success:false,msg:'data base is error'};
    }

}

exports.findAllUsers = findAllUsers;
exports.updateUser = updateUser;
exports.checkUserExist = checkUserExist;
exports.addUser = addUser;