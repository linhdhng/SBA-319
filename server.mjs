
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import product from './models/Product.mjs';
import products from './ultilities/data.js';
import category from './models/Category.mjs';
import order from './models/Order.mjs';

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

// Seed Routes
app.get('/seed', async (req, res) => {
    await product.deleteMany({});
    await product.create(products);
  
    res.send(`Database Seeded`);
});

app.get("/", async (req, res) => {  
    let result = await product.find({ $nor: [product] }).toArray();
    res.send(result).status(204);
  });


app.get('/search', async (req, res) => {
    const query = req.query.q;
    const result = await product.find({ category: query }).exec();
    res.json(result);
});

app.get('/product', async(req, res) => {
    try {
        const Products = await product.find({});
        res.status(200).json(Products);
    } catch (error) {
        res.status(500).send('Not Found')
    }
})

app.get("/product/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const product = await product.findById(id)
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Not Found')
    }
})

// POST request
app.post('/newproduct', async(req, res) => {
    try {
        const product = await product.create(req.body);
        res.status(200).send(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Not Found')
    }
});

//PUT Request
app.put('/product/:id', async(req,res) => {
    try {
    const {id} = req.params;
    const product = await product.findByIdAndUpdate(id, req.body);
    if(!product) {
        return res.status(404).send(`Cannot find any product with ${_id}`);
    }
    const updatedproduct = await product.findById(id)
    res.status(200).json(updatedproduct);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Not Found')
    }
});

// DELETE Request
app.delete('/product/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const product = await product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).send({message: `Cannot find product with id: ${id}`});
        }
        res.status(200).send(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Not Found');
    };
})

// Error handling
app.use((err, req, res, next) => {
    res.status(500).send("Seems like we messed up somewhere...");
});


app.listen(port, () => {
    console.log(`Server listening on ${port}`);
})

