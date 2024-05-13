// uploadCleanup.js
import fs from 'fs'
import path from 'path'
import cron from 'node-cron'

// Đường dẫn đến thư mục tạm
const tempDir = path.resolve(__dirname, '..', 'uploads'); // Điều chỉnh đường dẫn cho phù hợp với thư mục của bạn

// Hàm để xoá thư mục tạm
const cleanupTempDir = () => {
    fs.readdir(tempDir, (err, files) => {
        if (err) {
            console.error('Error reading temp directory:', err);
            return;
        }
        files.forEach(file => {
            const filePath = path.join(tempDir, file);
            fs.unlink(filePath, err => {
                if (err) {
                    console.error('Error deleting file:', err);
                } else {
                    console.log('File deleted successfully:', filePath);
                }
            });
        });
    });
};

// Lên lịch xoá thư mục tạm mỗi 1 phút
cron.schedule('*/5 * * * *', () => {
    console.log('Running cleanup task...');
    cleanupTempDir();
});

console.log('Uploads cleanup task scheduled to run every 5 minutes.');