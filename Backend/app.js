const express = require("express");
const app = express();
require("dotenv").config();
require("./connection/connection");
const cors = require("cors");
const bodyParser = require('body-parser');
const user = require("./Routes/user");
const book = require("./Routes/book");
const favourite = require("./Routes/favourite");
const cart = require("./Routes/cart");
const order = require("./Routes/order");


app.use(bodyParser.urlencoded());
app.use(express.json());
app.use(cors());
app.use("/api/user", user);         
app.use("/api/book", book);         
app.use("/api/favourite", favourite);         
app.use("/api/cart", cart);         
app.use("/api/order", order);         

app.listen(process.env.PORT, () => {
    console.log("http://localhost:"+process.env.PORT+"/api")
});
