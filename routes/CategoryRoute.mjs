import express from 'express'
const router = express.Router()
import category from '../models/Category.mjs'

router.get('/', async(req, res)=>{
    try {
        const Category = await category.find({})
        res.json({message: 'Categories fetched successfully', data: Category})
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
})

router.get('/:id', (req, res) => {
    res.json(res.result)
})

router.post("/", async(req,res) => {
    try {
        const data = await category.create(req.body)
        res.json({message: 'Category Created', data: data})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

export default router