// const multer = require('multer');
// const path = require('path');

// // Configure storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // Directory to store uploaded files
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
//   },
// });

// // Filter for image files
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'));
//   }
// };

// const upload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
// });

// module.exports = upload;
const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const cloudinary = require('../config/cloudinary')
const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    let folder = 'student-feedback'
    let resource_type = file.mimetype === 'application/pdf' ? 'raw' : 'video'

    return {
      folder,
      resource_type,
      public_id: `${Date.now()}-${file.originalname.replace(/[^\w\d-]/g, '_')}`
    }
  }
})

const upload = multer({ storage })

module.exports = upload
