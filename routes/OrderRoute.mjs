import express from 'express'
const router = express.Router()
import order from '../models/Order.mjs'

// Get all orders
router.get('/', async (req, res) => {
  try {
    const result = await order.find({})
    res.json(result)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Get one order
router.get('/:id', (req, res) => {
  res.json(res.result)
})

// Creating order
router.post('/', async (req, res) => {
  try {
    const newOrder = new order(req.body)
    await newOrder.save()
    res.json(newOrder)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Updating order
router.put('/:id', async (req, res) => {
  try {
    const updatedOrder = await order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res.json(updatedOrder)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Deleting Order
router.delete('/:id', async (req, res) => {
  try {
    await order.findByIdAndDelete(req.params.id)
    res.json({ message: 'Order Deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router