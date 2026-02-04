const express = require("express");
const { createShift, updateShift, deleteShift, getCustomerShifts, getCarerShifts } = require("../controllers/shift.controller");
const { protect } = require("../middlewares/auth.middleware");
const { allowRoles } = require("../middlewares/role.middleware");
const router = express.Router();

router.use(protect);
router.use(allowRoles("superadmin", "admin"));

/* Admin */
router.post("/", createShift);
router.put("/:id", updateShift);
router.delete("/:id",  deleteShift);

/* Views */
router.get("/customer/:customerId", getCustomerShifts);
router.get("/carer/:carerId", getCarerShifts);

module.exports = router;
