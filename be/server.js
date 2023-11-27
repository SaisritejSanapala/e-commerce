const express = require('express');
const PORT = 4000;
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const { MONGOBD_URL } = require('./config');

global.__basedir = __dirname;

mongoose.connect(MONGOBD_URL);

mongoose.connection.on('connected', () => {
    console.log("DB connected");
})
mongoose.connection.on('error', (error) => {
    console.log("Some error while connecting to DB");
})

require('./models/customer_model');
require('./models/seller_model');
require('./models/seller_product_model');
require('./models/cart_model');
require('./models/customer_address_model');
require('./models/orders_model');
require('./models/admin_model');

app.use(cors());
app.use(express.json());

app.use(require('./routes/customer_route'));
app.use(require('./routes/seller_route'));
app.use(require('./routes/seller_product_route'));
app.use(require('./routes/file_route'));
app.use(require('./routes/cart_route'));
app.use(require('./routes/customer_address_route'));
app.use(require('./routes/orders_route'));
app.use(require('./routes/admin_route'));

app.listen(PORT, () => {
    console.log("Server started on port", PORT);
});