const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const limiter = require("../middleware/rate-limiter")

router.use(limiter);
router.post("/signup", userCtrl.signup );
router.post("/login", userCtrl.login );

module.exports = router;