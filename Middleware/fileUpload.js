const multer = require("multer");

const fileUpload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "Uploads");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
  limits: { fileSize: 2 * 1024 * 1024, files: 2 }, //if fileSize is more than 2mb it gives error ie.File too large && if files are more than 2 it gives error ie.Too many files
});

// const fileUpload = multer({
//   storage: multer.memoryStorage({
//     destination: function (req, file, cb) {
//       cb(null, "Uploads");
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname);
//     },
//   }),
// });

module.exports = fileUpload;
