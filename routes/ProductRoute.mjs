import express from "express"
const router = express.Router()
import product from "../models/Product.mjs";

// Get Products
router.get('/', async(req, res) => {
    try {
        const Products = await product.find({});
        res.status(200).json(Products);
    } catch (error) {
        res.status(500).send('Not Found')
    }
})

// Get one Product
router.get("/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const Product = await product.findById(id)
        res.status(200).json(Product);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Not Found')
    }
})

// Create Product
router.post('/', async(req, res) => {
    try {
        const Product = await product.create(req.body);
        res.status(200).send(Product);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Not Found')
    }
});

// Update a Product
router.put('/:id', async(req,res) => {
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

// DELETE Product
router.delete('/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const Product = await product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).send({message: `Cannot find product with id: ${id}`});
        }
        res.status(200).send(Product);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Not Found');
    };
})

export default router