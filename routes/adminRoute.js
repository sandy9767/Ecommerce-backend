const express = require("express");
const adminRouter = express.Router();
const { addProduct, getProducts, deleteProduct, getOrders, changeOrderStatus, getAnalytics } = require("../controller/adminController");

// Add product
adminRouter.post("/add-product", addProduct);

// Get all your products
adminRouter.get("/get-products", getProducts);

// Delete the product
adminRouter.post("/delete-product", deleteProduct);

// Get all orders
adminRouter.get("/get-orders", getOrders);

// Change the order status of the product
adminRouter.post("/change-order-status", changeOrderStatus);

// Get the analyticss
adminRouter.get("/analytics", getAnalytics);

module.exports = adminRouter;
