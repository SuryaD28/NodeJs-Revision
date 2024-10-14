const jwt = require("jsonwebtoken");
const jwtSecretKey = "user-info";

//middleware for verify token from frontend
function verifyToken(req, res, next) {
  let token = req.headers["authorization"];
  //console.log("token", token);
  if (token) {
    //console.log("Token" , token)//send bearer key in postman headers with authorization : bearer token
    token = token.split(" ")[1]; //split is use to get token in array format with bearer key & token when we provide[1] after split we get only token
    jwt.verify(token, jwtSecretKey, (err, valid) => {
      if (err) {
        res.send("Please provide a valid token");
      } else {
        console.log("Token is valid");
        req.user = valid.user;
        next();
      }
    });
  } else {
    res.send("Please provide a token");
  }
}

module.exports = verifyToken;
