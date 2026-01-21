import dotenv from 'dotenv';
import connectDB from './src/config/database.js';
import app from './src/app.js';

dotenv.config();

const PORT = process.env.PORT || 3002;

// connect database
connectDB();

app.listen(PORT, () => {
    console.log(`server running at PORT: ${PORT}`);
});