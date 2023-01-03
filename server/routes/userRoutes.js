const { register, login, setAvatar, getAllUsers, test } = require("../controllers/usersController");

const router = require("express").Router();

router.post("/register",register);
router.post("/login",login);
router.post("/setAvatar/:id",setAvatar);
router.get("/allusers/:id",getAllUsers);
router.get("/test",test);

module.exports = router;