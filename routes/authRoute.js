const express = require("express");
const authRouter = express.Router();
const { signUp, signIn, isTokenValid, getUserData } = require("../controller/authController");

// SIGN UP
authRouter.post("/signup", signUp);

// Sign In Route
authRouter.post("/signin", signIn);

// Is Token Valid?
authRouter.post("/tokenIsValid", isTokenValid);

// get user data
authRouter.get("/", getUserData);

module.exports = authRouter;
