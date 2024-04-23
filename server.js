// IMPORTS FROM PACKAGES
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
// IMPORTS FROM OTHER FILES
const adminRouter = require("./routes/adminRoute");
const authRouter = require("./routes/authRoute");
const productRouter = require("./routes/productRoute");
const userRouter = require("./routes/userRoute");
const connectDB = require("./config/dbConnection");
const errorHandler = require("./middlewares/errorHandler");

// DATABASE CONNECTION
connectDB();

// INIT
const PORT = process.env.PORT || 3000;
const app = express();

// middleware
app.use(express.json());
app.use('/api', authRouter);
app.use('/api/admin', adminRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use(errorHandler)

// CONNECTION
app.listen(PORT, () => {
  console.log(`Connected at port ${PORT}`);
});
