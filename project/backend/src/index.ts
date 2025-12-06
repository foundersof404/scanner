import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import scanRoutes from './routes/scan';
import productRoutes from './routes/products';
import vendorRoutes from './routes/vendors';
import notificationRoutes from './routes/notifications';
import adminRoutes from './routes/admin';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/scan', scanRoutes);
app.use('/products', productRoutes);
app.use('/vendors', vendorRoutes);
app.use('/notifications', notificationRoutes);
app.use('/admin', adminRoutes);

app.get('/', (req, res) => {
    res.send('AI Price Comparison API');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
