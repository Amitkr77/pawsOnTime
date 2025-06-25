import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js'
import consultRoutes from './routes/consultRoutes.js'
import petRoutes from './routes/petRoutes.js';
import schedulerRoutes from './routes/scheduleRoutes.js';
import walkerRoutes from './routes/walkerRoutes.js';
import userRoutes from './routes/userRoutes.js'

dotenv.config();
const app = express();
connectDB();

app.use(cors({
    origin: "http://localhost:8080",
    credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/consult', consultRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/schedule', schedulerRoutes);
app.use('/api/walker', walkerRoutes);
app.use("/api/users", userRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
