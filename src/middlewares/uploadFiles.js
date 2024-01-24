const multer = require("multer");

// Preparation
const file = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "src/uploads")
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + "-" + file.originalname.replace(/\s/g, ""))
  }
})

const upload = multer({
  storage: file
})

module.exports = upload