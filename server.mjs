
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import products from './ultilities/data.mjs';
import ProductRoute from './routes/ProductRoute.mjs'
import OrderRoute from './routes/OrderRoute.mjs';
import CategoryRoute from './routes/CategoryRoute.mjs'

dotenv.config();
const app = express();
const port = process.env.port || 5000;

mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log('Connected to MongoDB!');
        }).catch((error) => {
            console.log(error);
        });

// Middlewares
app.use(express.json());

//Routes
app.use('/category', CategoryRoute)
app.use('/products', ProductRoute)
app.use('/orders', OrderRoute)

// Seed Routes
app.get('/seed', async (req, res) => {
    await product.create(products);
    res.send(`Database Seeded`);
});

app.get("/", async (req, res) => {  
    res.send('Homepage')
});

app.get('/search', async (req, res) => {
    const query = req.query.q;
    const result = await product.find({ category: query }).exec();
    res.json(result);
});

// Error handling
app.use((err, req, res, next) => {
    res.status(500).send("Seems like we messed up somewhere...");
});


app.listen(port, () => {
    console.log(`Server listening on ${port}`);
})

