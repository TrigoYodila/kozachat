const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const conversationRoute = require('./Routes/conversationRoute')
const messageRoute = require('./Routes/messageRoute');

//Routes
const AuthRoute = require('./Routes/AuthRoute');


const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(passport.initialize())

const restrictor = passport.authenticate('jwt',{session:false})

require('./passport')
// app.use(bodyparser.json({ limit: "30", extended: true }));
// app.use(bodyparser.urlencoded({ limit: "30", extended: true }));

require("dotenv").config();
const PORT = process.env.PORT;

const CONNEXION = process.env.MONGODB_CONNECTION;

mongoose
  .connect(CONNEXION, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Connected and Listening at Port ${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

app.use('/auth',AuthRoute);
app.use('/conversation',conversationRoute)
app.use('/message',messageRoute);
