
import express from 'express';
import mongoose from 'mongoose';
import product from './models/Product.js'
import dotenv from 'dotenv'

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

//Seed Routes
// app.get('/seed', async (req, res) => {
//     await Fruits.deleteMany({});
//     await Fruits.create(fruits);
  
//     res.send(`Database Seeded`);
//   });


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

