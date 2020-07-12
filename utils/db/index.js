/**
 * Created by dengziyan on 2020/6/18.
 */
const mongoose = require('mongoose');

//数据开启
function dbOpen(){
    mongoose.connect('mongodb://localhost/lnsf');
    mongoose.connection.once('open',function(err){
        if(!err){
            console.log('Mongodb is openning');
        }else{
            console.log('Something is wrong,mongodb isn\'opening');
        }
    })
}

exports.dbOpen = dbOpen;

