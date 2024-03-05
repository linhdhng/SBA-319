import mongoose from "mongoose";

const OrderSchema = new Schema(
    {
        line_items: Object,
        name: String,
        email: String,
        address: String,
        paid: Boolean,
    }, 
    {
        timestamps: true,
}); 

const order = mongoose.model('Oder', OrderSchema);
export default order;