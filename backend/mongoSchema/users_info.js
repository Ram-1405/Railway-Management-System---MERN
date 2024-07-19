const mongoose=require('mongoose');

const userschema=new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},
{collection:'UserInfo'});

const Users=mongoose.model('Users',userschema);
module.exports=Users;