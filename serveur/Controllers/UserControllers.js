const UserModel = require('../Models/userModel');

//Get a User

const getaUser = async (req, res) => {

    const id = req.params.id;

    try{
        const user = await UserModel.findById(id);

        if(user){
            const {password, ...otherDetails } = user._doc;

            res.status(200).json(otherDetails);
        }else{
            res.status(404).json("No such User");
        }
    } catch (error){
        res.status(500).json(error)
    }
}

// Get all users
const getAllUsers = async (req, res) => {

  try {
    let users = await UserModel.find();
    users = users.map((user)=>{
      const {password, ...otherDetails} = user._doc
      return otherDetails
    })
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

//add User 

const addUser = (req, res) => {

  const { username, password } = req.body;

  const newUser = new UserModel({
    username,
    password,
    profilepicture
  })

  newUser.save()
  .then((user)=>{
    res.status(201).json({
      message:"user created",
      user
    })
  }).catch((error)=>{res.status(400).json(error)})
}

// Get all users
const getaAllUsers = async (req, res) => {

  try {
    let users = await UserModel.find({
      _id: { $ne: req.params.id },
    });
    users = users.map((user)=>{
      const {password, ...otherDetails} = user._doc
      return otherDetails
    })
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { getaUser, getAllUsers, getaAllUsers, addUser };
