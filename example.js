//THIS FILE IS SEND BY THE TEACHER FOR CODE CHECKING

const express = require("express");
const app = express();
const dbConnect = require("./config");
app.use(express.json());
const jwt = require("jsonwebtoken");
const jwtSecretKey = "e-comm";
const refresh_secret_key = "xzxsxsxscsc";
const cors = require("cors");
app.use(cors());
//let verifyToken = require("./middleware/verifyToken");

app.get("/getData", verifyToken, async (req, res) => {
  const collection = await dbConnect();
  let user = await collection.find().toArray();
  console.log("User data", user);
  res.send(user);
});

app.post("/login", async (req, res) => {
  const collection = await dbConnect();
  //   const data = await collection.find().toArray();
  //   console.log(data)
  if (req.body.email && req.body.password) {
    let user = await collection.findOne(req.body);
    if (user) {
      // jwt.sign({ user }, jwtSecretKey, { expiresIn: "1m" }, (err, token) => {
      //   if (err) {
      //     res.send("Something went wrong Please try again later");
      //   }
      //   jwt.verify(token, jwtSecretKey, (err, valid) => {
      //     if (err) {
      //       res.send("Token is not valid");
      //     } else {
      //       console.log("Token is valid");
      //       res.send({ user, auth: token });
      //     }
      //   });
      //   // res.send({ user, auth: token });
      // });
      const accessToken = jwt.sign({ user }, jwtSecretKey, { expiresIn: "1m" });
      const refreshToken = jwt.sign({ user }, refresh_secret_key, {
        expiresIn: "1d",
      });
      res.send({ user, accessToken, refreshToken });
    } else {
      res.send("User not found");
    }
  } else {
    res.send("User not found");
  }
});

// app.get("/auth", (req, res) => {
//     let token = req.headers["authorization"];
//     if (token) {
//       token = token.split(" ")[1];
//       jwt.verify(token, jwtSecretKey, (err, valid) => {
//         if (err) {
//           res.send("Token is not valid");
//         } else {
//           res.send("Token is valid");
//         }
//       });
//     } else {
//       res.send("Please provide token with header");
//     }
// });

app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) return res.send("Please provide refresh token");
  jwt.verify(refreshToken, refresh_secret_key, (err, user) => {
    if (err) {
      res.send("Token is not valid");
    } else {
      const newAccessToken = jwt.sign({ user }, jwtSecretKey, {
        expiresIn: "15m",
      });
      res.send({ accessToken: newAccessToken });
    }
  });
});

app.listen(5000);
