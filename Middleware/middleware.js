const middleware = (req, res, next) => {
  //console.log("middleware");
  if (!req.query.age) {
    res.send("<h2>Please Provide age..</h2>");
  } else if (req.query.age <= 18) {
    res.send("<h2>You must be over 18 to access this page.</h2>");
  } else {
    next();
  }
};

module.exports = middleware;
