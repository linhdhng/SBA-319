import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        parent: {type:mongoose.Types.ObjectId, ref:'Category'}
})

const category = mongoose.model('Category', CategorySchema);
export default category;
