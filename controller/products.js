const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};

exports.postAddProduct = (req, res, next) => {
  const products = new Product(req.body.title);
  products.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll( (products) => {
    res.render("shop", { prods: products, pageTitle: "Shop", path: "/" });
  });
  
};
