/**
 * Created by dengziyan on 2020/6/13.
 */
const express = require('express');
const data = require('../data/users');
const userService = require('../service/userService');

var router = express.Router();
//get方法得到所有用户
router.get('/',async function(req,res){
    //res.send(data.users);
    var data = await userService.findAllUsers();
    console.log('router:'+data.users);
    res.send(data);
})

router.post('/',async function(req,res){
    var user = req.body;
    //后台router验证
    if(user==undefined||user=={}||user.username==''){
        //添加不成功告诉客户端
        res.send({success:false,msg:'添加用户不能为空'});
    }else{
        //添加成功，要重新显示
        //data.users.push(user);
        var data = await userService.addUser(user);
        res.send(data);
    }

})

router.put('/',async function(req,res){
    var user = req.body;
    //后台router验证
    if(user==undefined||user=={}||user.username==''){
        res.send({success:false,msg:'用户名不能为空'});
    }else{
        var data = await userService.updataUser(user);
        res.send(data);
    }
})

router.delete('/:id',function(req,res){
    if(req.params.id==undefined||req.params.id==''){
        res.send({success:true,msg:'用户名不能为空'})
    }else {
        var data = userService.deleteUser(req.params.id);
        if(data.success){
            res.send({success:true,users:userService.findUsers([])});
        }else{
            res.send(data);
        }
    }
})

exports.router = router;