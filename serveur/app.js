const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");


console.log(process.env.PORT);

//Routes

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

mongoose.connect(CONNEXION)
.then(()=>app.listen(PORT, () => console.log(`Listening to port ${PORT}`, CONNEXION)))
.catch((error)=>console.log(`${error} did not connect`))




