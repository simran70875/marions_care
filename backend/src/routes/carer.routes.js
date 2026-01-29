const express = require('express');
const {
  createCarer,
  getCarers,
  getCarerById,
  updateCarer,
  deleteCarer,
  archiveCarer,
  restoreArchivedCarer,
  statusUpdate,
  bulkUploadCarers
} = require("../controllers/carer.controller.js");

const{ protect } =require("../middlewares/auth.middleware.js");
const{ allowRoles } =require("../middlewares/role.middleware.js");
const { upload } = require('../middlewares/upload.js');

const router = express.Router();

router.use(protect);
router.use(allowRoles("superadmin", "admin"));

router.post("/", createCarer);
router.get("/", getCarers);
router.get("/:id", getCarerById);
router.put("/:id", updateCarer);
router.delete("/:id", deleteCarer);
router.patch("/archive/:id", archiveCarer);
router.patch("/archive/restore/:id", restoreArchivedCarer);
router.put("/status/:id", statusUpdate);
router.post("/bulk-upload", upload.single("file"), bulkUploadCarers);

module.exports = router;
