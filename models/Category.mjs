import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        properties: [{
            type: Object
        }]
})

const category = mongoose.model('Category', CategorySchema);
export default category;
