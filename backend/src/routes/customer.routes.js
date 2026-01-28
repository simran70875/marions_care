const express = require('express');
const {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  archiveCustomer,
  restoreArchivedCustomer,
  updateCustomerContacts,
  statusUpdate
} = require("../controllers/customer.controller.js");

const { protect } = require("../middlewares/auth.middleware.js");
const { allowRoles } = require("../middlewares/role.middleware.js");

const router = express.Router();

router.use(protect);
router.use(allowRoles("superadmin", "admin"));

router.post("/", createCustomer);
router.get("/", getCustomers);
router.get("/:id", getCustomerById);
router.put("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);
router.patch("/archive/:id", archiveCustomer);
router.patch("/archive/restore/:id", restoreArchivedCustomer);
router.put("/contacts/:id", updateCustomerContacts);
router.put("/status/:id", statusUpdate);

module.exports = router;
