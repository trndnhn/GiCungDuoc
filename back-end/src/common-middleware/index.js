const jwt = require("jsonwebtoken");
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "webshopwhatever",
  api_key: "787922553729536",
  api_secret: `Gt-jSq9Q4TOAUCpfhZUwmjzdYmA`,
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});



exports.upload = multer({ storage });


exports.uploadImages = function (pathArray) {
  return new Promise((resolve, reject) => {
    const urlArray = [];
    pathArray.forEach((path) => {
      cloudinary.uploader.upload(path, (error, result) => {
        if (error) {
          reject(error);
        } else {
          urlArray.push({ img: result.url });
          if (urlArray.length === pathArray.length) {
            resolve(urlArray);
          }
        }
      });
    });
  });
};

exports.requireSignin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
  } else {
    return res.status(400).json({ message: "Authorization required" });
  }
  next();
  //jwt.decode()
};

exports.userMiddleware = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(400).json({ message: "User access denied" });
  }
  next();
};

exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    if (req.user.role !== "super-admin") {
      return res.status(400).json({ message: "Admin access denied" });
    }
  }
  next();
};

exports.superAdminMiddleware = (req, res, next) => {
  if (req.user.role !== "super-admin") {
    return res.status(200).json({ message: "Super Admin access denied" });
  }
  next();
};
