//exporting object

// module.exports = {
//   name: "ABC",
//   address: "Mumbai",
// };

//exporting function

// module.exports = function (a, b) {
//   console.log(a + b);
// };

//=================================================================================================================

//OS module

//const os = require("os");

// console.log("Operating System:", os.type()); //Returns the operating system name.
// console.log("Hostname : ", os.hostname()); //Returns the hostname of the operating system.
// console.log("User Information : ", os.userInfo()); //Returns information about the current user, including username, homedir, shell, and more.
// console.log("Platform:", os.platform()); //Returns a string identifying the operating system platform
// console.log("Architecture:", os.arch()); //Returns a string identifying the operating system's CPU architecture
// console.log("Free Memory:", os.freemem() / (1024 * 1024 * 1024)); //Returns the amount of free system memory in bytes
// console.log("Total Memory:", os.totalmem() / (1024 * 1024 * 1024)); //Returns the total amount of system memory in bytes
// console.log("Home Directory:", os.homedir()); //Returns the home directory of the current user.
// console.log("System Uptime:", os.uptime(), "seconds"); //Returns the system uptime in second
// console.log("Temporary Directory : ", os.tmpdir()); //Returns the operating system's default directory for temporary files.
// console.log("Machine Architecture:", os.machine()); //Returns a string identifying the hardware platform
// console.log("OS Version:", os.version()); //Returns a string identifying the operating system's version.
// console.log("OS Release:", os.release()); //Returns a string identifying the release version of the operating system

//event and EventEmitter

// const express = require("express");
// const app = express();

// const EventEmitter = require("events");
// const event = new EventEmitter();

// //Example:1
// let Count = 0;
// event.on("GetApiEvent", () => {
//   Count++;
//   console.log("Event Called", Count);
// });

// app.get("/", (req, res) => {
//   res.send("Get api called");
//   event.emit("GetApiEvent");
// });

// app.get("/call", (req, res) => {
//   res.send("Get api called");
//   event.emit("GetApiEvent");
// });

// //Example:2
// event.on("greet", (name) => {
//   console.log(`Hello, ${name}!`);
// });

// app.get("/name", (req, res) => {
//   res.send("Name is being displayed");
//   event.emit("greet", "Suryakanta");
// });

// app.get("/myname", (req, res) => {
//   res.send("Name is being displayed");
//   event.emit("greet", "Arya");
// });
// app.listen(5000);

//JWT => JsonWebToken using MongoDB database

// const express = require("express");
// const dbConnect = require("./config");
// const cors = require("cors");

// const app = express();
// app.use(express.json());
// app.use(cors());

// const jwt = require("jsonwebtoken");
// const jwtSecretKey = "user-info";
// const refresh_SecretKey = "sdsdsdsdsd";

// const verifyToken = require("./Middleware/verifyToken");

// //with middleware-verifyToken
// //getData from frontend
// app.get("/getData", verifyToken, async (req, res) => {
//   //console.log("req headers in getData", req.headers);
//   const collection = await dbConnect();
//   let user = await collection.find().toArray();
//   console.log("User data", user);
//   res.send(user);
// });

// app.get("/auth", verifyToken, async (req, res) => {
//   //console.log("req headers in getData", req.headers);
//   const collection = await dbConnect();
//   let user = await collection.find().toArray();
//   console.log("User data", user);
//   res.send(user);
// });

// //Login api with sign method
// // app.post("/login", async (req, res) => {
// //   const collection = await dbConnect();
// //   //   const data = await collection.find().toArray();
// //   //   console.log(data);
// //   if (req.body.email && req.body.password) {
// //     //verify token from frontend to backend with getdata using :auth
// //     let user = await collection.findOne(req.body);
// //     if (user) {
// //       jwt.sign({ user }, jwtSecretKey, { expiresIn: "1m" }, (err, token) => {
// //         if (err) {
// //           res.send("Something went wrong : token");
// //         }
// //         res.send({ user, auth: token });
// //       });
// //     } else {
// //       res.send("User Not Found");
// //     }
// //   } else {
// //     res.send("UserData not found");
// //   }
// // });

// //login with sign & verify method
// app.post("/login", async (req, res) => {
//   const collection = await dbConnect();

//   if (req.body.email && req.body.password) {
//     let user = await collection.findOne(req.body);
//     if (user) {
//       // jwt.sign({ user }, jwtSecretKey, { expiresIn: "2h" }, (err, token) => {
//       //   if (err) {
//       //     res.send("Something went wrong : token");
//       //   }
//       //   jwt.verify(token, jwtSecretKey, (err, valid) => {
//       //     if (err) {
//       //       res.send("Token is not valid");
//       //     } else {
//       //       console.log("Token is valid");
//       //       res.send({ user, auth: token });
//       //     }
//       //   });
//       // });
//       //generate token with accesstoken  and refreshToken
//       const accessToken = jwt.sign({ user }, jwtSecretKey, { expiresIn: "1m" });
//       const refreshToken = jwt.sign({ user }, refresh_SecretKey, {
//         expiresIn: "1d",
//       });
//       res.send({ user, accessToken, refreshToken }); //sending details at the login time in frontend
//     } else {
//       res.send("User Not Found");
//     }
//   } else {
//     res.send("UserData not found");
//   }
// });

// //verify method
// // app.get("/auth", (req, res) => {
// //   let token = req.headers["authorization"];
// //   console.log("Token before if ", token);
// //   if (token) {
// //     jwt.verify(token, jwtSecretKey, (err, valid) => {
// //       if (err) {
// //         res.send("Token is not valid");
// //       } else {
// //         res.send("Token is Valid");
// //       }
// //     });
// //   } else {
// //     res.send("Please provide token with header");
// //   }
// // });

// //refreshToken
// app.post("/refresh", (req, res) => {
//   const refreshToken = req.body.refreshToken;
//   // console.log(refreshToken);
//   if (!refreshToken) return res.send("Please provide refresh Token");
//   jwt.verify(refreshToken, refresh_SecretKey, (err, user) => {
//     if (err) {
//       res.send("Token in not valid");
//     } else {
//       const newAccessToken = jwt.sign({ user }, jwtSecretKey, {
//         expiresIn: "15m",
//       });
//       res.send({ accessToken: newAccessToken });
//     }
//   });
// });

// // Register API
// app.post("/register", async (req, res) => {
//   const collection = await dbConnect();

//   const { userName, email, password } = req.body;

//   // Check if email and password are provided
//   if (email && password && userName) {
//     // Check if the user already exists
//     const existingUser = await collection.findOne({ email });

//     if (existingUser) {
//       return res.status(400).send("User already registered");
//     }

//     // Insert new user into the database
//     const newUser = {
//       userName,
//       email,
//       password,
//     };

//     const result = await collection.insertOne(newUser);
//     console.log("User registered:", result);

//     return res.status(201).json({ message: "User registered successfully" });
//   }
// });

// app.listen(5000);

//send email using nodemailer

const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: "gmail",
  secure: "true",
  port: 465,
  auth: {
    user: "dhalesuryakanta8@gmail.com",
    pass: "mfxp geuy tlfo klax",
  },
});

// let mailOptions = {
//   from: "dhalesuryakanta8@gmail.com",
//   //to: "suryad2803@gmail.com",     //sending mail to single user
//   to: "dattamore2157@gmail.com, vinayakdhale11@gmail.com", //sending mail to multiple receivers
//   subject: "Practice Nodemailer",
//   text: "This is Nodemailer Practice email for testing with cc & bcc",
//   cc: "suryad2803@gmail.com",
//   bcc: "chandrakantakalam@gmail.com",
// };

let mailOptions = {
  from: "dhalesuryakanta8@gmail.com",
  to: "suryad2803@gmail.com",
  subject: "Practice nodemailer",
  text: "Practice nodemailer using attachments",
  attachments: [
    {
      //utf-8 string as an attachment
      filename: "sample.txt",
      content: "Hello Sample text file",
    },
    {
      //file on disk as an attachment
      filename: "Demo.txt",
      path: __dirname + "/Files/Demo.txt",
    },
  ],
};

transport.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Email sent successfully with attchments", info.response);
  }
});
