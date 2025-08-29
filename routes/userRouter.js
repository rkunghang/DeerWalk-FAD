const express = require ("express");
const { body } = require ("express-validator");
const auth = require ("../middleware/authMiddleware");
const userController = require ("../controllers/userController");
const {getAllUsers,
    createUser,
    getUserById,
    deleteUser,
    loginUser,
    updateUser,
} = require ("../controllers/userController");

const router = express.Router();

router.post ("/register",
    [
        body("name").notEmpty().withMessage("Name is required"),
        body("email").isEmail().withMessage("Invalid email"),
        body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    ],
    createUser
);

router.get ("/", getAllUsers);
router.post ("/", createUser);
router.get ("/:id",getUserById);
router.delete ("/:id", deleteUser);
router.post ("/login", loginUser);
router.put ("/:id", updateUser);
router.get ("/", auth, getAllUsers);

module.exports = router;

