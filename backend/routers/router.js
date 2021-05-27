const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");

router.get("/", controller.renderLoginPage);
router.get("/home", controller.renderHomePage);
router.get("/user", controller.renderUserPage);

router.get("/api/users", controller.getUsers);

router.delete("/api/delete/user/:id", controller.deleteUser);
router.put("/api/user", controller.editUser);
router.post("/api/createuser", controller.createUser);
router.post("/api/login", controller.postLogin);

module.exports = router;
