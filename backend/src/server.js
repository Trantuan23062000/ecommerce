import express from "express"
import ApiRouter from "./routes/api"
import connect from "./config/connect"
import bodyParser from "body-parser"
import config from "./config/cors"
import cors from "cors"

const errorMessages = {
   '400': 'Bad Request - Yêu cầu không hợp lệ.',
   '401': 'Unauthorized - Không được phép truy cập.',
   '403': 'Forbidden - Tài nguyên bị cấm truy cập.',
   '404': 'Not Found - Không tìm thấy tài nguyên.',
   '500': 'Internal Server Error - Lỗi máy chủ nội bộ.',
   'default': 'Something went wrong - Đã xảy ra lỗi.'
 };

require("dotenv").config()
require('./config/uploadCleanup');
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
ApiRouter(app)
connect(app)
config(app)

app.use((err, req, res, next) => {
   console.error(err.stack);
   
   const statusCode = err.statusCode || 500;
   const errorMessage = errorMessages[statusCode.toString()] || errorMessages['default'];
   
   res.status(statusCode).json({ error: errorMessage });
 });


const PORT = process.env.PORT || 8001
app.listen (PORT,() =>{
   console.log(`Server running http://localhost:${PORT}`);
})



 