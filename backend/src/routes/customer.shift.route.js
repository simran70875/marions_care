const express = require("express");
const { getPrivateCustomerShifts } = require("../controllers/shift.controller");
const { protect } = require("../middlewares/auth.middleware");
const { allowRoles } = require("../middlewares/role.middleware");
const router = express.Router();

router.use(protect);
router.use(allowRoles("client"));

/* Views */
router.get("/", allowRoles("client"), getPrivateCustomerShifts);

module.exports = router;
