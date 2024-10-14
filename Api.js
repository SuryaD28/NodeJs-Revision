const express = require("express");
const dbConnect = require("./config");
const mongodb = require("mongodb");
const cors = require("cors");
const fileUpload = require("./Middleware/fileUpload");

const app = express();

app.use(express.json());
app.use(cors());

const mongoose = require("mongoose");
//connect to mongodb
mongoose.connect("mongodb://localhost:27017/EmployeeDetails");

const File = require("./Mongoose_Model/File");

//read data from database
app.get("/", async (req, res) => {
  let data = await dbConnect();
  let result = await data.find().toArray();
  //console.log("Get Api Result ", result);
  res.send(result);
});
//POST api method = post data through api
app.post("/postData", async (req, res) => {
  //console.log("req", req.body);
  let data = await dbConnect();

  let result = await data.insertOne(req.body);

  //let result = await data.insertMany(req.body);
  //res.send({ result: result });
  res.send({ result: " Data Added successfully" });
  // res.send("Post Data Successfully");
});
//PUT api method = update data in database
app.put("/update", async (req, res) => {
  let data = await dbConnect();

  // let result = await data.updateOne(
  //   { name: "Nobita" },
  //   { $set: { salary: 98765 } }
  // );

  let result = await data
    .updateOne
    // { email: "abc@gmail.com" },
    // { $set: { password: req.body.password } }
    ();
  res.send(result);
});
//update data with query
app.put("/updateQuery", async (req, res) => {
  let data = await dbConnect();
  let result = await data.updateOne(
    { name: "Jerry" },
    { $set: { name: req.query.name } }
  );
  res.send(result);
});
//Delete data from database
app.delete("/delete", async (req, res) => {
  let data = await dbConnect();

  let result = await data.deleteOne(req.body);

  //let result = await data.deleteMany({ address: "London" });

  res.send(result);
});
//Delete data using query with id
app.delete("/delete", async (req, res) => {
  console.log(req.query);

  let data = await dbConnect();
  let result = await data.deleteOne({
    _id: new mongodb.ObjectId(req.query.id),
  });
  res.send(result);
});
// Route using req.query
app.get("/search", (req, res) => {
  const searchTerm = req.query.salary || "No search term provided";
  res.send(`Search Term: ${searchTerm}`);
});
app.put("/", async (req, res) => {
  //console.log(req.query);
  let data = await dbConnect();
  let result = await data.updateOne(
    { name: "Jerry" },
    { $set: { name: req.query.name } }
  );
  res.send(result);
});
// Route using req.params
app.get("/users/:id", (req, res) => {
  const userId = req.params.id || "No user ID provided";
  res.send(`User ID: ${userId}`);
});
app.delete("/delete/:id", async (req, res) => {
  //console.log(req.params);
  let data = await dbConnect();
  let result = await data.deleteOne({
    _id: new mongodb.ObjectId(req.params.id),
  });
  res.send(result);
});

//********************************************************************************************************************************************* */

//Multer => use to Upload file

//middleware
// const fileUpload = multer({
//   storage: multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "Uploads");
//     },
//     filename: function (req, file, cb) {
//       //cb(null, file.fieldname + ".jpg");
//       //cb(null, file.originalname);
//       cb(null, file.fieldname + "-" + Date.now() + ".jpeg");
//     },
//   }),
// });

//Single file upload from node using postman click on body then form-data then provide key "file" then select file
// app.post("/uploadFile", fileUpload.single("file"), (req, res) => {
//   console.log("File", req.file);
//   res.send("File upload Successfully");
// });

//Multiple file upload using same filed from node using postman
// app.post("/uploadFile", fileUpload.array("file"), (req, res) => {
//   console.log("File", req.files);
//   res.send("Files uploaded Successfully");
// });

//Upload file using different fields from node using postman click on body then form-data then provide 2key "nature" & "avatar" then select file
// app.post(
//   "/uploadFile",
//   fileUpload.fields([{ name: "nature", maxCount: 2 }, { name: "avatar" }]),
//   (req, res) => {
//     //console.log("File", req.files);
//     console.log("Avatar", req.files.avatar);
//     res.send("Files uploaded Successfully");
//   }
// );
// app.listen(5000);

//************************************************************************************************************* */

//Uploading file from Frontend  //react-revision project inside upload file folder check it

app.post("/uploadSingleFile", fileUpload.single("singlefile"), (req, res) => {
  console.log("Original Name: ", req.file.originalname);
  console.log("File", req.file);

  res.send("File upload Successfully");
});

// app.post(
//   "/uploadMultipleFile",
//   fileUpload.array("multiplefile"),
//   (req, res) => {
//     console.log("File", req.files);
//     res.send("File upload Successfully");
//   }
// );

// app.post(
//   "/uploadFilewithField",
//   fileUpload.fields([{ name: "First" }, { name: "Second" }, { name: "Third" }]),
//   (req, res) => {
//     console.log("File", req.files);
//     res.send("File upload Successfully");
//   }
// );

//SAVE FILE IN DATABASE      *********************************************************************************************************

// Single file upload and save to MongoDB
// app.post(
//   "/uploadSingleFile",
//   fileUpload.single("singlefile"),
//   async (req, res) => {
//     const file = req.file;

//     const newFile = new File({
//       filename: file.originalname,
//       contentType: file.mimetype,
//       data: file.buffer,
//       size: file.size,
//     });

//     await newFile.save();

//     console.log("File", file);
//     res.send("File uploaded and saved successfully");
//   }
// );

app.listen(5000);
