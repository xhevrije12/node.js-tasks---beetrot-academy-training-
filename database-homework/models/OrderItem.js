// #### Model 4: OrderItem
// Create `models/OrderItem.js` with:
// - `order` (ObjectId, ref: 'Order', required) ← **Relationship to Order**
// - `product` (ObjectId, ref: 'Product', required) ← **Relationship to Product**
// - `quantity` (Number, required, min: 1) - how many of this product
// - `price` (Number, required) - price at time of purchase
// - `timestamps` enabled

// **Key Concept:** 
// - One Order can have many OrderItems (one-to-many)
// - One Product can be in many OrderItems (one-to-many)

const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    price: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true
});
module.exports = mongoose.model('OrderItem', orderItemSchema);
