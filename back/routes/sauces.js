const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const sauceCtrl = require("../controllers/sauces");
const limiter = require("../middleware/rate-limiter")

router.use(limiter);
router.get("/", auth, sauceCtrl.findAllSauces);
router.post("/:id/like", auth, sauceCtrl.likeSauce);
router.get("/:id", auth, sauceCtrl.findOneSauce);
router.post("/", auth, multer, sauceCtrl.createSauce);
router.put("/:id", auth, multer, sauceCtrl.modifySauce);
router.delete("/:id", auth, sauceCtrl.deleteSauce);
module.exports = router;
