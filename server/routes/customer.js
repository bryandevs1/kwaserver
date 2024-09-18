const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
const multer = require("multer");
const path = require("path");

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads")); // Adjust path if needed
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Customer Routes
router.post("/add", upload.single("image"), customerController.postCustomer); // Handle file upload in 'image' field
router.put("/edit/:id", upload.single("image"), customerController.editPost); // Handle file upload during edit

/**
 *  Customer Routes
 */
router.get("/", customerController.homepage);
router.get("/about", customerController.about);
router.get("/add", customerController.addCustomer);
router.get("/view/:id", customerController.view);
router.get("/edit/:id", customerController.edit);
router.delete("/edit/:id", customerController.deleteCustomer);

router.post("/search", customerController.searchCustomers);

module.exports = router;
