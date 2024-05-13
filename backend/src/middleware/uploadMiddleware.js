import multer from 'multer';

// Cấu hình để lưu trữ tệp tải lên vào thư mục `uploads`
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// Khai báo biến `upload` để sử dụng trong các tuyến đường
const upload = multer({ storage: storage });

export default upload;
