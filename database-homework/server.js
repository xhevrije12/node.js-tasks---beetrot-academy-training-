const express = require('express');
const app = express();
const connectDB = require('./db/connection');
const OrderItem = require('./models/OrderItem');
const Customer = require ('./models/Customer');
const Order = require ('./models/Order');
const Product = require('./models/Product');
require('dotenv').config();

connectDB();

const PORT = process.env.PORT || 3000;
app.use(express.json());
// #### Product Endpoints------------------------------------------------------------------------------------

// **POST /api/products** - Create a new product
// - Validate: name, price, stock are required
// - Return created product

app.post('/api/products', async (req, res) => {
    try {
        const { name, description, price, stock, category } = req.body;
        if (!name || price == null || stock == null) {
            return res.status(400).json({ message: 'Name, price, and stock are required.' });
        }
        const newProduct = new Product({ name, description, price, stock, category });
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// **GET /api/products** - Get all products
// - Return list of all products
// - Optional: Filter by category using query parameter `?category=Electronics`

app.get('/api/products', async (req, res) => {
    try {
        const filter = {};
        if (req.query.category) {
            filter.category = req.query.category;
        }
        const products = await Product.find(filter);    
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
//

// **GET /api/products/:id** - Get product by ID
// - Return product or 404 if not found

app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// **GET /api/products/category/:category** - Get products by category
// - Return all products in a specific category

app.get('/api/products/category/:category', async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.category });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
//--------------------------------------------------------------------------------------------------------

// #### Customer Endpoints

// **POST /api/customers** - Create a new customer
// - Validate: name, email are required
// - Check if email already exists
// - Return created customer

app.post('/api/customers', async (req, res) => {
    try {
        const { name, email, phone, address } = req.body;
        if (!name || !email) {
            return res.status(400).json({ message: 'Name and email are required.' });
        }
        const existingCustomer = await Customer.findOne({ email });
        if (existingCustomer) {
            return res.status(400).json({ message: 'Email already exists.' });
        }
        const newCustomer = new Customer({ name, email, phone, address });
        const savedCustomer = await newCustomer.save();
        res.status(201).json(savedCustomer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// **GET /api/customers** - Get all customers
// - Return list of all customers

app.get('/api/customers', async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// **GET /api/customers/:id** - Get customer by ID
// - Return customer or 404 if not found

app.get('/api/customers/:id', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// **GET /api/customers/:id/orders** - Get all orders for a customer
// - Use `Order.find({ customer: customerId })`
// - Use `populate()` to include order items and products
// - Return customer info and their orders

app.get('/api/customers/:id/orders', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        const orders = await Order.find({ customer: req.params.id })
            .populate({
                path: 'items.product',
                model: 'Product'
            });
        res.status(200).json({ customer, orders });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// **POST /api/orders** - Create a new order
// - Validate: customerId and items array are required
// - Check if customer exists
// - For each item in items array:
//   - Validate productId, quantity are provided
//   - Check if product exists
//   - Check if product has enough stock
//   - Calculate item total (quantity × product.price)
// - Calculate totalAmount (sum of all item totals)
// - Create the Order
// - Create OrderItems for each product
// - Update product stock (subtract quantity)
// - Return created order with populated customer and items


app.post('/api/orders', async (req, res) => {
    try {
        const { customerId, items } = req.body;
        if (!customerId || !items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: 'customerId and items are required.' });
        }
        const customer = await Customer.findById(customerId);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found.' });
        }
        let totalAmount = 0;
        const orderItems = [];
        for (const item of items) {
            const { productId, quantity } = item;
            if (!productId || !quantity || quantity < 1) {
                return res.status(400).json({ message: 'Each item must have productId and quantity >= 1.' });
            }
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ message: `Product with ID ${productId} not found.` });
            }
            if (product.stock < quantity) {
                return res.status(400).json({ message: `Insufficient stock for product ${product.name}.` });
            }
            const itemTotal = product.price * quantity;
            totalAmount += itemTotal;
            orderItems.push({ product: productId, quantity, price: product.price });
        }
        const newOrder = new Order({ customerId, totalAmount });
        const savedOrder = await newOrder.save();
        for (const item of orderItems) {
            const orderItem = new OrderItem({
                order: savedOrder._id,
                product: item.product,
                quantity: item.quantity,
                price: item.price,
            });
            await orderItem.save();
            await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } });
        }
        const populatedOrder = await Order.findById(savedOrder._id)
            .populate('customerId')
            .populate({
                path: 'orderItems',
                populate: { path: 'product' }
            });
        res.status(201).json(populatedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



// **GET /api/orders** - Get all orders
// - Use `populate('customer', 'name email')` to get customer info
// - Return orders with customer details

app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('customerId', 'name email');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// **GET /api/orders/:id** - Get order by ID
// - Use `populate('customer')` to get full customer object
// - Use `populate('orderItems')` to get order items
// - Use nested populate: `populate({ path: 'orderItems', populate: { path: 'product' } })`
// - Return order with full details

app.get('/api/orders/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('customerId')
            .populate({
                path: 'orderItems',
                populate: { path: 'product' }
            });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// **PATCH /api/orders/:id/status** - Update order status
// - Validate: status is provided and is valid ('pending', 'completed', 'cancelled')
// - Update order status
// - Return updated order

app.patch('/api/orders/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const validStatuses = ['pending', 'completed', 'cancelled'];
        if (!status || !validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Valid status is required.' });
        }
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }   
});

//how to make the api to add in stock 
// POST /api/products/:id/restock - Restock a product
// - Validate: quantity is provided and is positive 

app.post('/api/products/:id/restock', async (req, res) => {
    try {
        const { quantity } = req.body;
        if (!quantity || quantity <= 0) {
            return res.status(400).json({ message: 'Positive quantity is required.' });
        }
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { $inc: { stock: quantity } },
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



// #### OrderItem Endpoints (Optional)

// **GET /api/order-items** - Get all order items
// - Use `populate('order')` and `populate('product')`
// - Return order items with full details

app.get('/api/order-items', async (req, res) => {
    try {
        const orderItems = await OrderItem.find()
            .populate('order')
            .populate('product');
        res.status(200).json(orderItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
  


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});