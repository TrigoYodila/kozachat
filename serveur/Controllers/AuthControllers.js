const UserModel = require('../Models/userModel')
const { hashSync } = require('bcrypt')
const jwt = require('jsonwebtoken');

//Register new user
const registerUser = async (req, res) => {

    const hashpassword = hashSync(req.body.password, 10)
    req.body.password = hashpassword
    
    const newUser = new UserModel(req.body)
    const {username} = req.body;

    try{
        //add new user
        const oldUser = await UserModel.findOne({username});
        
        if(oldUser)
            return res.status(400).json({message:"User already exists"});
        
        //changed
        const user = await newUser.save();
        const token = jwt.sign(
            {username:user.username,id:user._id},
            process.env.JWTKEY,
            {expiresIn:"1h"}
        );
    }catch(error){

    }
};

const loginUser = (req, res) => {
  console.log("Login post request");
};