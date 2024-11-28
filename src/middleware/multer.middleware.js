import multer from 'multer';
import { __dirname } from '../utils/utils.js';
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'profile-pictures') {
      return cb(null, `${__dirname}/documents/profile-pictures`);
    } else if (file.fieldname === 'product-thumbnails') {
      return cb(null, `${__dirname}/documents/product-thumbnails`);
    } else {
      return cb(null, `${__dirname}/documents/documents`);
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname}-${uniqueSuffix}`);
  },
});

const upload = multer({ storage: storage });

export default upload;
