// #### Model 1: Product
// Create `models/Product.js` with:
// - `name` (String, required)
// - `description` (String, optional)
// - `price` (Number, required, min: 0)
// - `stock` (Number, required, min: 0) - quantity in stock
// - `category` (String, optional) - e.g., "Electronics", "Clothing"
// - `timestamps` enabled

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {  
    type: Number,
    required: true,
    min: 0,
    },

stock: {
    type: Number,
    required: true,
    min: 0,
    },
category: {
    type: String,
    enum:['Electronics','Clothing']
    },
}, { 
    timestamps: true 
});

module.exports = mongoose.model('Product', productSchema);