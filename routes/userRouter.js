const express = require ("express");
const {getAllUsers,
    createUser,
    getUserById,
    deleteUser,
} = require ("../controllers/userController");

const router = express.Router();

router.get ("/", getAllUsers);
router.post ("/", createUser);
router.get ("/:id",getUserById);
router.delete ("/:id", deleteUser);

module.exports = router;

