const multer = require('multer')
 //creating user upload middleware
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/images");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + 'SharmaInt' + file.originalname);
    },
  });
const maxSize = 3 * 1024 * 1024; // for 1MB
 
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    console.log(file )
    if ( file.mimetype == "image/png" ||file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb({success: false,
        msg: 'Invalid file type. Only jpg, png image files are allowed.'},false);
    }
  },
  limits: { fileSize: maxSize },
}).single('file');
module.exports = upload