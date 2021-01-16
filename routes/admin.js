const path = require("path");

const express = require("express");
const { body } = require("express-validator/check");

const adminController = require("../controllers/admin");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", isAuth, adminController.getAddProduct);

// /admin/products => GET
router.get("/products", isAuth, adminController.getProducts);

// /admin/add-product => POST
router.post(
  "/add-product",
  [
    body("title").isString().trim().isLength({ min: 3 }).withMessage('Incorrect Title'),
    body("imageUrl").isURL().withMessage('Incorrect URL'),
    body("price").isFloat().withMessage('Incorrect Price'),
    body("description").trim().isLength({ min: 8, max: 200 }).withMessage('Incorrect Description'),
  ],
  isAuth,
  adminController.postAddProduct
);

router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);

router.post(
  "/edit-product",
  [
    body("title").isString().trim().isLength({ min: 3 }).withMessage('Incorrect Title'),
    body("imageUrl").isURL().withMessage('Incorrect URL'),
    body("price").isFloat().withMessage('Incorrect Price'),
    body("description").trim().isLength({ min: 8, max: 200 }).withMessage('Incorrect Description'),
  ],
  isAuth,
  adminController.postEditProduct
);

router.post("/delete-product", isAuth, adminController.postDeleteProduct);

module.exports = router;
