// #### Model 3: Order
// Create `models/Order.js` with:
// - `customer` (ObjectId, ref: 'Customer', required) ← **Relationship to Customer**
// - `totalAmount` (Number, required, min: 0) - total price of the order
// - `status` (String, default: 'pending') - 'pending', 'completed', 'cancelled'
// - `orderDate` (Date, default: Date.now)
// - `timestamps` enabled

// **Key Concept:** One Customer can have many Orders (one-to-many).

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  totalAmount: {  
    type: Number,
    required: true,
    min: 0,
    },
status: {
    type: String,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending',
    },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  orderItems: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'OrderItem' },

  orderDate: {
    type: Date,
    default: Date.now,
  }
}, { 
    timestamps: true 
});

module.exports = mongoose.model('Order', orderSchema);