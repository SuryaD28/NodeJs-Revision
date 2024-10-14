const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017";
const database = "EmployeeDetails";
const client = new MongoClient(url);

// async function dbConnect() {
//   let result = await client.connect();
//   const db = result.db(database);
//   return db.collection("Employees");
// }

//this for  jwt token in app.js file
async function dbConnect() {
  let result = await client.connect();
  const db = result.db(database);
  return db.collection("User");
}
module.exports = dbConnect;
