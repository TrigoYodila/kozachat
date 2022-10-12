const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

//Routes
const AuthRoute = require('./Routes/AuthRoute');

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
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