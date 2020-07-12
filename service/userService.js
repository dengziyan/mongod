const usersdata = require('../data/users');
const userDao = require('../dao/userDao');

//增加用户
async function addUser(user){
    //1.判断用户名是否存在，存在则直接返回告诉不能增加
   var data = await userDao.checkUserExist(user.username);
    if(data.success){
        return {success:false,msg:data.msg};
    }else{
        //2.不存在：发起添加动作
        var isAdd = await userDao.addUser(user);
        //3.添加的动作结果
        if(isAdd.success){
            return await userDao.findAllUsers();
        }else{
            return isAdd;
        }
    }
}
//查找所有用户
async function findAllUsers(){
    var data = await userDao.findAllUsers();
    console.log('service:'+data.users);
    return data;
}

//查询用户的方法;条件查询：传入是一个params数组{属性：值}
function findUsers(params){
    var users = [];
    //没有条件
    if(params==undefined||params==[]){
       return usersdata.users;

    }else{
        //有条件：
        for(var i=0;i<usersdata.users.length;i++){
            //1.取出用户
            var user=usersdata.users[i];
            //2.取出要比较的属性
            var keys = Object.keys(params);
            var isequal = true;
            //3.遍历属性
            for(var j=0;j<keys.length;j++){
                var key = keys[j];
                if(user[key]!=params[key]){
                    //4.有一个属性的值不等
                    isequal = false;
                    break;
                }
            }
            if(isequal){
                users.push(user);
            }
        }
    }
    return users;
}

//更新用户的方法
async function  updataUser(user){
    //1判断用户是否存在
    //2不存在则直接返回并告知，存在则发出更新需求
    //3更新是否成功：更新成功则返回true,并返回所数据
    var data = await userDao.updateUser(user);
    if(data.success){
        var usersdata = await userDao.findAllUsers()
        return usersdata;
    }else {
        return data;
    }

}

//删除用户的方法
function deleteUser(username){
    var users = usersdata.users;
    var index = -1;
    for(var i=0;i<users.length;i++){
        if(users[i].username==username){
            index = i;
            break;
        }
    }
    if(index==-1){
        return {success:false,msg:'用户不存在'};
    }else{
        users.splice(i,1);
        return{success:true,msg:'用户删除成功'};
    }
}


//共享
exports.addUser=addUser;
exports.findUsers = findUsers;
exports.updataUser = updataUser;
exports.deleteUser = deleteUser;

exports.findAllUsers = findAllUsers;
exports.updataUser = updataUser;