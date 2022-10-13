const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({

    username:{
        type:String,
        reuired:true
    },
    password:{
        type:String,
        reuired:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    profilepicture:{
        type:String
    }
  },
  {timestamps:true})

  const UserModel = mongoose.model('User',UserSchema)
 
  module.exports = UserModel