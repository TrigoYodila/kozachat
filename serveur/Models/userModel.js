const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email : {
        type:String,
        required:true,
    },
    username:{
        type:String,
        reuired:true
    },
    password:{
        type:String,
        reuired:true
    },
    lastname:{
        type:String,
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    profilepicture:String,
  },
  {timestamps:true})

  const UserModel = mongoose.model('User',UserSchema)
 
  module.exports = UserModel