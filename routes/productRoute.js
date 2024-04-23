const express = require("express");
const productRouter = express.Router();
const { getProducts, searchProducts, rateProduct, dealOfTheDay } = require("../controller/productController");

// Get the list of products
productRouter.get("/", getProducts);

// create a get request to search products and get them
productRouter.get("/search/:name", searchProducts);

// create a post request route to rate the product.
productRouter.post("/rate-product", rateProduct);

productRouter.get("/deal-of-day", dealOfTheDay);

module.exports = productRouter;
