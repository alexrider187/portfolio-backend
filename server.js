import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import app from './app.js';

dotenv.config();

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});