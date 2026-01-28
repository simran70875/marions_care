const express = require('express');
const {
  createCarer,
  getCarers,
  getCarerById,
  updateCarer,
  deleteCarer,
  archiveCarer,
  restoreArchivedCarer,
} = require("../controllers/carer.controller.js");

const{ protect } =require("../middlewares/auth.middleware.js");
const{ allowRoles } =require("../middlewares/role.middleware.js");

const router = express.Router();

router.use(protect);
router.use(allowRoles("superadmin", "admin"));

router.post("/", createCarer);
router.get("/", getCarers);
router.get("/:id", getCarerById);
router.put("/:id", updateCarer);
router.delete("/:id", deleteCarer);
router.patch("/:id/archive", archiveCarer);
router.patch("/:id/archive/restore", restoreArchivedCarer);

module.exports = router;
