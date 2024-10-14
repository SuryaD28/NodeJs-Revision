const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
//app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const mongoose = require("mongoose");
//connect to mongodb
mongoose.connect("mongodb://localhost:27017/EmployeeDetails");

const User = require("./Mongoose_Model/User");

// Register API
app.post("/api/register", async (req, res) => {
  const { userName, email, password } = req.body;

  const newUser = new User({ userName, email, password });

  const savedUser = await newUser.save();
  res
    .status(201)
    .json({ message: "User registered successfully", user: savedUser });
});

// Login API using moongoose
app.post("/api/login", async (req, res) => {
  //   let data = await User({
  //     email: "xyz@gmail.com",
  //     password: 1234567,
  //   });
  //   let result = await data.save();
  //   res.send(result);
  //   console.log("Post data suceefully");

  let newData = await User(req.body);
  console.log(req.body);
  let newResult = await newData.save();
  res.send(newResult);
});

app.listen(5000);
