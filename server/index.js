import express from 'express';
import connectDB from './config/db.js';
import leadRoutes from './routes/lead.routes.js';

const app = express();
app.use(express.json());

connectDB();
app.use('/api/leads', leadRoutes);

app.listen(5000, () => {
    console.log('Server is running at http://localhost:5000');
});