import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
    {
        item: Object,
        name: String,
        email: {
            type: String,
            validate: {
                validator: function(v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
                },
                message: props => `${props.value} is not a valid email address.`
            },
        },
        address: String,
        
        paid: {
            type: Boolean,
            required: true
            }
        
    }, 
    {
        timestamps: true,
}); 

const order = mongoose.model('Oder', OrderSchema);
export default order;