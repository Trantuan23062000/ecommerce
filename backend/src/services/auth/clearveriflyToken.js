import cron from "node-cron"
import db from "../../models"
const updateExpiredTokens = async () => {
    try {
      const expirationTime = new Date(Date.now() - 12 * 60 * 60 * 1000); // 12 hours ago
      await db.Users.update(
        { verificationToken: null }, // Update verificationToken to null
        {
          where: {
            verificationToken: { [Op.not]: null }, // Only update non-null tokens
            created_at: { [Op.lt]: expirationTime } // Tokens created more than 12 hours ago
          }
        }
      );
      console.log('Expired verification tokens updated successfully.');
    } catch (error) {
      console.error('Error updating expired verification tokens:', error);
    }
  };
  
  // Schedule the job to run every day
  cron.schedule('0 0 * * *', updateExpiredTokens); // Run at midnight every day