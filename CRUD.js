const dbConnect = require("./config");

//Read Data from MongoDB
const readData = async () => {
  const data = await dbConnect();
  const readResult = await data.find().toArray();
  console.log("Read data => ", readResult);
};

//Insert Data in MongoDB
const insertData = async () => {
  const data = await dbConnect();
  //   const insertResult = await data.insertOne({
  //     name: "EmpThree",
  //     empId: 103,
  //     address: "Hydrabad",
  //     salary: 25000,
  //   });

  const insertResult = await data.insertMany([
    {
      name: "ABC",
      empId: 201,
      address: "Nanded",
      salary: 2000,
    },
    {
      name: "XYZ",
      empId: 301,
      address: "Sangli",
      salary: 25000,
    },
    {
      name: "PQR",
      empId: 401,
      address: "Satara",
      salary: 25000,
    },
  ]);
  //console.log(insertResult);
  if (insertResult.acknowledged) {
    console.log("Insert Data ...", insertResult);
  }
};

//Update Data in MongoDB
const updateData = async () => {
  const data = await dbConnect();
  //   const updateResult = await data.updateOne(
  //     { name: "Surya" },
  //     { $set: { empId: 501 } }
  //   );

  const updateResult = await data.updateMany(
    { salary: 25000 },
    { $set: { address: "Kerala" } }
  );
  console.log("Update Data...", updateResult);
};

//Delete Data from MongoDB
const deleteData = async () => {
  const data = await dbConnect();
  const deleteResult = await data.deleteOne({ name: "Arya" });
  console.log("Delete Data Result ...", deleteResult);
};

module.exports = { readData, insertData, updateData, deleteData };
