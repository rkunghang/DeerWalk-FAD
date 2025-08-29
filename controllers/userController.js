const mongoose = require("mongoose");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

// const getAllUsers = async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array ()});
//     }
// }


const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign
    ({ userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
    
    res.json({ message: "Login successful", token });
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password -__v");
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createUser = async (req, res) => {
    const errors = validationResult(req); //for validating user input
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {name, email, password} = req.body;

    const existingUser = await User.findOne ({ email: email });
    console.log("user =", existingUser);
    if (existingUser) {
        return res.status(400).send({ message: "email exists"});
    }

    const salt = await bcrypt.genSalt(10); //hashing password
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const user = new User ({
        name: name,
        email: email,
        password: hashedPassword,
    });
    await user.save();
    
    res.send (user);
}

const getUserById = async (req, res) => {
    try {
        const user = await User.findById (req.params.id);
        if (!user) return res.status (400).json({ message: "user not found"});
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
};

const deleteUser = async (req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json ({message: "User not Found"});
        res.json({message: "user deleated successfully"});
    }catch (err) {
        res.status(500).json ({message:err.message});
    }
};

const updateUser = async (req, res) => {
    try {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) return res.status(404).json({message: "User not found"});
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ message: err.message }); 
    }  
}


module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    deleteUser,
    loginUser,
    updateUser,
};