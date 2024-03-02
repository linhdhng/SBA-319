// Create a template model for data input
const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        word: {
            type: String,
            required: true
        },
        pronunciation: {
            type: String,
            required: true,
        },
        translation: {
            type: String,
            required: true,
        }
    }
)

let card = mongoose.model('Card', schema)

module.exports = card;