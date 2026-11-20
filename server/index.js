import express from 'express';
import connectDB from './src/config/db.js';

const app = express();
app.use(express.json());

connectDB();

app.listen(5000, () => {
    console.log('Server is running at http://localhost:5000');
});