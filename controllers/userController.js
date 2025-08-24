const mongoose = require("mongoose");
const User = require("../models/userModel");

// const getAllUsers = async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array ()});
//     }
// }

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password -__v");
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createUser = async (req, res) => {
    const {name, email, password} = req.body;

    const existingUser = await User.findOne ({ email: email });
    console.log("user =", existingUser);
    if (existingUser) {
        return res.status(400).send({ message: "email exists"});
    }
    
    const user = new User ({
        name: name,
        email: email,
        password: password,
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

module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    deleteUser,
};