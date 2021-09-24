const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const data = require('./data');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
     useNewUrlParser: true,
    // useCreateIndex: true,
     useUnifiedTopology: true,
    
}, err => {
    if(err) throw err;
    console.log('connected to MongoDB')
})

const Product = mongoose.model('products',
    new mongoose.Schema({
        name: String,
        description: String,
        image: String,
        price: Number,
        calorie: Number,
        category: String,

    })
);

app.get('/api/products/seed', async(req, res) => {
    const products = await Product.insertMany(data.products);
    res.send({products});
})

app.get('/api/products', async(req, res) => {
    const {category} = req.query;
    const products = await Product.find(category ? {category} : {});
    res.send(products);
})

app.post('/api/products', async(req, res) => {
    const newProduct = new Product(req.body)
    const saveProduct = await newProduct.save();
    res.send(saveProduct);
})


app.get('/api/categories', (req,res) => {
    res.send(data.categories);
});

const Order = mongoose.model(
    'order',
    new mongoose.Schema(
      {
        number: { type: Number, default: 0 },
        orderType: String,
        paymentType: String,
        isPaid: { type: Boolean, default: false },
        isReady: { type: Boolean, default: false },
        inProgress: { type: Boolean, default: true },
        isCanceled: { type: Boolean, default: false },
        isDelivered: { type: Boolean, default: false },
        totalPrice: Number,
        taxPrice: Number,
        orderItems: [
          {
            name: String,
            price: Number,
            quantity: Number,
          },
        ],
      },
      {
        timestamps: true,
      }
    )
  );

  app.post('/api/orders', async (req, res) => {
    const lastOrder = await Order.find().sort({ number: -1 }).limit(1);
    const lastNumber = lastOrder.length === 0 ? 0 : lastOrder[0].number;
    if (
      !req.body.orderType ||
      !req.body.paymentType ||
      !req.body.orderItems ||
      req.body.orderItems.length === 0
    ) {
      return res.send({ message: 'Data is required.' });
    }
    const order = await Order({ ...req.body, number: lastNumber + 1 }).save();
    res.send(order);
  });
  
  app.get('/api/orders', async (req, res) => {
    const orders = await Order.find({ isDelivered: false, isCanceled: false });
    res.send(orders);
  });

app.use(express.static(path.join(__dirname, '/build')))

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`);
})
