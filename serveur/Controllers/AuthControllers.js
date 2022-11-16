const { hashSync, compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const UserModel = require("../Models/userModel");

const registerUser = async (req, res) => {
  const hashpassword = hashSync(req.body.password, 10);
  req.body.password = hashpassword;

  const newUser = new UserModel(req.body);
  const { username } = req.body;

  try {
    //check useconst loginUser = (req,res) => {r existing
    const oldUser = await UserModel.findOne({ username });

    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    //save new user
    newUser.save().then((user) => {
      //token
      const token = jwt.sign(
        { username: user.username, id: user._id },
        process.env.JWTKEY,
        { expiresIn: "1d" }
      );
      res.status(200).json({
        success: true,
        message: "user created successfully",
        user: user,
        token: "Bearer " + token,
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = (req, res) => {
  const { username, password } = req.body;

  UserModel.findOne({ username: username })
    .then((user) => {
      if (user) {
        const validity = compareSync(password, user.password);

        if (!validity) {
          res.status(400).json({
            success: false,
            message: "wrong pasword",
          });
        } else {
          //token
          const token = jwt.sign(
            { username: user.username, id: user._id },
            process.env.JWTKEY,
            { expiresIn: "1d" }
          );
          res.status(200).json({
            success: true,
            message: "Login successfully",
            token: "Bearer " + token,
            user,
          });
        }
      } else {
        res.status(404).send({
          success: false,
          message: "user not found",
        });
      }

      //password not found
    })
    .catch((err) => {
      res.status(401).json({
        success: false,
        message: err,
      });
    });
};

const protectedUser = (req, res) => {
 
  return res.status(200).send({
    success: true,
    user: {
      id: req.user._id,
      username: req.user.username,
    },
  });
};

const getUserIdWithToken = (req, res) => {
   const token = req.headers.authorization.slice(7);
   const decoded = jwt.verify(token, "Trigo@1996");
  return res.status(200).send({
    message:"user decoded",
    user:decoded
  })
}

const getUser = (req, res) => {
  const userId = req.params.userId;

 UserModel.findOne({ _id: userId })
   .then((data) => {
     res.status(200).send({
       user: data,
     });
   })
   .catch((err) => {
     res.status(401).json({
       message: err,
     });
   });
}

module.exports = { registerUser, loginUser, protectedUser, getUserIdWithToken,getUser };


