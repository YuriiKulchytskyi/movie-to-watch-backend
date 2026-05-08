const controller = require("../../controllers/auth/index");
const { controllerWrapper } = require("../../helpers");
const  authMiddleware  = require("../../middleware/authMiddleware");

const router = require("express").Router();

router.post("/registration", controller.registration);
router.post("/login", controller.login);
router.post("/logout", controllerWrapper(authMiddleware), controller.logout);
router.get('/current', controllerWrapper(authMiddleware), controller.current)

module.exports = router;
