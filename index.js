// const user = require("./app"); //import object
// console.log("Name: ", user.name);
// console.log("Address: ", user.address);

// const add = require("./app"); //import function
// add(2, 4);

//console.log("Hello Everyone Wecome to Node...");

// let a = 10;
// let b = 20;
// console.log(a + b);

// if (a === 10) {
//   console.log("Matched");
// }

let arr = [1, 2, 3, 4, 5, 2, 7, 8, 2];
//console.log("Arr: ", arr);
const result = arr.filter((item) => {
  return item == 2;
});
//console.log(result);

// console.log("My current directory is : ",__dirname);
// console.log(" File name is", __filename);

//const fs = require("fs");
//READ FILE

// fs.readFile("./Sample.txt", "utf-8", (err, data) => {
//   if (err) {
//     return err;
//   }
//   console.log(data);
// });

//WRITE File

// let data = "This is Sample text file  using write file method.";
// fs.writeFile("./Write.txt", data, (err) => {
//   if (err) console.log(err);
//   else {
//     console.log("file written...");
//   }
// });

//CREATE SERVER
//const http = require("http");

// http
//   .createServer((req, res) => {
//     res.write("<h1> Welcome to NodeJs</h1>");
//     res.end();
//   })
//   .listen(5000);

const colors = require("colors");
console.log("Good Morning".green);
console.log("Good Afternoon".bgRed);
console.log("Using colors module".rainbow);

const http = require("http");
const data = require("./data");

// http
//   .createServer((req, res) => {
//     res.writeHead(200, { "Content-Type": "application/json" });
//     res.write(JSON.stringify(data));
//     res.end();
//   })
//   .listen(5000, () => {
//     console.log("Server is running on port 5000".bgBlue);
//   });

//console.log(process.argv[5]);

// const fs = require("fs");
// const path = require("path");

// const dirPath = path.join(__dirname, "Files");
// //console.log(dirPath);
// const filePath = `${dirPath}/Demo.txt`;
// const filePathRename = `${dirPath}/rename.txt`;
// const filePathDelete = `${dirPath}/Deletefile1.txt`;

//WRITE FILE
//fs.writeFileSync(filePath, "This is first demo file in File folder... ");

// for (i = 0; i < 5; i++) {
//   fs.writeFileSync(
//     dirPath + "/sample" + i + ".txt",
//     "This is Sample text file..."
//   );
// }

//READ FILE
// fs.readFile(filePath, "utf-8", (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data.bgGreen);
//   }
// });

//UPDATE or APPEND file
// fs.appendFile(filePath, "Update the data in the Demo file... ", (err) => {
//   if (!err) {
//     console.log("File is Update".bgBlue);
//   }
// });

//FILE RENAME
// fs.rename(filePathRename, `${dirPath}/simple.txt`, (err) => {
//   if (!err) {
//     console.log("File Name is Change...".bgMagenta);
//   }
// });

//DELETE FILE
// fs.unlinkSync(filePathDelete);

//EXPRESS

// const express = require("express");
// const app = express();

// app.get("", (req, res) => {
//   res.send(`<h1>This is Home Page</h1>
//     <a href="/about">Go to About Page</a> <br/>
//     <a href="/contact">Go to Contact Page</a>
//     `);
// });

// //basic routes

// app.get("/about", (req, res) => {
//   console.log(req.query.name);
//   res.send(
//     `<input type="text" placeholder="Enter your name" />
//     <a href="/">Back to Home</a>`
//   );
// });

// app.get("/contact", (req, res) => {
//   // res.send({ name: "Surya", age: 23 });
//   res.send([
//     {
//       name: "Surya",
//       age: 23,
//       address: "Pune",
//     },
//     {
//       name: "Arya",
//       age: 24,
//       address: "Mumbai",
//     },
//   ]);
// });

// app.post("/postData", (req, res) => {
//   res.send("Sending data using post method");
// });

// app.put("/put", (req, res) => {
//   res.send("Update data");
// });

// app.delete("/delete", (req, res) => {
//   res.send("delete data");
// });

// app.listen(5000);

//routing with static method with html pages

// const express = require("express");
// const path = require("path");

// const app = express();

// const publicPath = path.join(__dirname, "Public");

// //remove extension from url
// app.get("", (req, res) => {
//   res.sendFile(`${publicPath}/Home.html`);
// });
// app.get("/about", (req, res) => {
//   res.sendFile(`${publicPath}/About.html`);
// });
// app.get("*", (req, res) => {
//   res.sendFile(`${publicPath}/ErrorPage.html`);
// });

// // app.use(express.static(publicPath));
// app.listen(5000);

//Middleware         =================================================================================

const express = require("express");
// const middleware = require("./Middleware/middleware");
const app = express();

// const middleware = (req, res, next) => {
//   //console.log("middleware");
//   if (!req.query.age) {
//     res.send("<h2>Please Provide age..</h2>");
//   } else if (req.query.age <= 18) {
//     res.send("<h2>You must be over 18 to access this page.</h2>");
//   } else {
//     next();
//   }
// };

//app.use(middleware); //this is use for application level middleware

// app.get("", (req, res) => {
//   res.send("<h1>This is Home Page</h1>");
// });

// app.get("/about", middleware, (req, res) => {
//   // route level middleware
//   res.send("<h1>This is about Page</h1>");
// });

// app.get("/contact", middleware, (req, res) => {
//   res.send("<h1>This is Contact Page</h1>");
// });

// app.listen(5000);

//****************** CRUD operation with mongoDB below code copy in seperate file i.e config.js

// const { MongoClient } = require("mongodb");
// const url = "mongodb://localhost:27017";
// const database = "EmployeeDetails";
// const client = new MongoClient(url);

// async function dbConnect() {
//   let result = await client.connect();
//   const db = result.db(database);
//   return db.collection("Employees");
//   // const data = await collection.find().toArray();
//   // console.log(data);
// }

//dbConnect();
//console.log(dbConnect()); //it gives Promise in console

// const dbConnect = require("./config");  //importing config file which have mondoDb details and below promise also using .then & async-await

//HANDEL Promise using .then
// dbConnect().then((response) => {
//   response
//     .find()
//     .toArray()
//     .then((data) => {
//       console.log(data);
//     });
// });

//HANDEL Promise using async-await
// const main = async () => {
//   const data = await dbConnect();
//   res = await data.find().toArray();
//   console.log(res);
// };
// main();

const { readData, insertData, updateData, deleteData } = require("./CRUD");

readData();
insertData();
updateData();
deleteData();
