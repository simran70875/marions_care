const express = require('express');
const {
  createAdmin,
  getAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  restoreAdmin,
} = require("../controllers/admin.controller.js");
const { protect } = require("../middlewares/auth.middleware.js");
const{ allowRoles } =require("../middlewares/role.middleware.js");

const router = express.Router();

router.use(protect);
router.use(allowRoles("superadmin"));

// CRUD routes
router.post("/create", createAdmin);
router.get("/", getAdmins);
router.get("/:id", getAdminById);
router.put("/:id", updateAdmin);
router.delete("/:id", deleteAdmin);
router.patch("/:id/restore", restoreAdmin);

module.exports = router;
