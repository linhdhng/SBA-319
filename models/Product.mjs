// Create a template model for data input with built-in custom validators
import mongoose from 'mongoose';

const ProductSChema = new mongoose.Schema(
    {
        title: {type:String, required:true},
        price: {
            type: Number, 
            validate: {
                validator: function(v) {
                return /^\d+\.99$/.test(v)
                },
                message: props => `${props.value} is not a valid price.`
            },
            required: [true, 'Price is required']   
        },
        category: {type: String, enum: ['polish', 'tool', 'accessories'], description: "Invalid category"},
    }, 

    {
        timestamps: true,
    }
)

const product = mongoose.model('Product', ProductSChema)
export default product;