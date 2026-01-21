// #### Model 2: Customer
// Create `models/Customer.js` with:
// - `name` (String, required)
// - `email` (String, required, unique)
// - `phone` (String, optional)
// - `address` (String, optional)
// - `timestamps` enabled


const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
     required: true,
     unique:true
  },
  phone: {  
    type: String,
    },

address: {
    type: String,
    },
}, { 
    timestamps: true 
});

module.exports = mongoose.model('Customer', customerSchema);