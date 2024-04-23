const jwt = require("jsonwebtoken");
const authHandler = require("../middlewares/authHandler");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");

const signUp = asyncHandler(async (req, res) => {
    console.log("here")
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res
                .status(400)
                .json({ msg: "User with same email already exists!" });
        }

        const hashedPassword = await bcryptjs.hash(password, parseInt(process.env.HASH_ROUNDS));

        let user = new User({
            email,
            password: hashedPassword,
            name,
        });
        user = await user.save();
        res.json(user);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

const signIn = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(400)
                .json({ msg: "User with this email does not exist!" });
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Incorrect password." });
        }

        const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET);
        res.json({ token, ...user._doc });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

const isTokenValid = asyncHandler(async (req, res) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) return res.json(false);
        const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (!verified) return res.json(false);

        const user = await User.findById(verified.id);
        if (!user) return res.json(false);
        res.json(true);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

const getUserData = asyncHandler(authHandler, async (req, res) => {
    const user = await User.findById(req.user);
    res.json({ ...user._doc, token: req.token });
})

module.exports = {
    signUp,
    signIn,
    isTokenValid,
    getUserData
}