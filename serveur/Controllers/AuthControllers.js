const { hashSync, compareSync } = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserModel = require('../Models/userModel')

const registerUser = async(req,res) => {

    const hashpassword = hashSync(req.body.password,10)
    req.body.password = hashpassword

    const newUser = new UserModel(req.body)
    const {email} = req.body

    try{
        //check user existing
        const oldUser = await UserModel.findOne({email})

        if(oldUser)
            return res.status(400).json({message:"User already exists"});

        //save new user
        newUser.save().then((user)=>{
            //token
            const token = jwt.sign(
                {username:user.username, id:user._id},
                process.env.JWTKEY,
                {expiresIn:"1h"}
            )
            res.status(200).json({
                success:true,
                message:"user created successfully",
                user,
                token
            })
        })
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

const loginUser = (req,res) => {
    const {username, password} = req.body;

    UserModel.findOne({username:username}).then((user)=>{

        if(user){
            const validity = compareSync(password, user.password)

            if(!validity){
                res.status(400).json({
                    success:false,
                    message:"wrong pasword"
                });
            }else{
              //token
              const token = jwt.sign(
                { username: user.username, id: user._id },
                process.env.JWTKEY,
                { expiresIn: "1h" }
              );
              res.status(200).json({
                success: true,
                message: "Login successfully",
                // user,
                token,
              });
            }
        }else{
            res.status(404).send({
              success: false,
              message: "user not found",
            });
        }

        //password not found
    }).catch(err => {
        res.status(401).json({
            success:false,
            message:err
        })
    })
}
module.exports = { registerUser, loginUser };


































// const UserModel = require('../Models/userModel')
// const { hashSync } = require('bcrypt')
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken');

// //Register new user
// const registerUser = async (req, res) => {

//     const salt = await bcrypt.genSalt(10);
//     const hashpassword = await bcrypt.hash(req.body.password,salt)
//     req.body.password = hashpassword
//     const newUser = new UserModel(req.body)
//     const {username} = req.body;

//     try{
//         //add new user
//         const oldUser = await UserModel.findOne({username});
        
//         if(oldUser)
//             return res.status(400).json({message:"User already exists"});
        
//         //changed
//         const user = await newUser.save();
//         const token = jwt.sign(
//             {username:user.username,id:user._id},
//             process.env.JWTKEY,
//             {expiresIn:"1h"}
//         );
//     }catch(error){

//     }
// };


// //Login User

// //Changed
// const loginUser = async (req, res) => {
//   const {username, password} = req.body;

//   try{
//     const user = await UserModel.findOne({username:username});

//     if(user){
//         const validity = await bcrypt.compare(password, user.password);

//         if(!validity){
//             res.status(400).json("wrong password");
//         }else{
//             const token = jwt.json(
//                 {username:user.username,id:user._id},
//                 process.env.JWTKEY,
//                 {expiresIn:"1h"}
//             );
//             res.status(200).json({user,token});
//         }
//     }else{
//         res.status(404).json("User not found")
//     }
//   }catch(err){
//     res.status(500).json(err)
//   }
// };

// module.exports = {loginUser,registerUser}