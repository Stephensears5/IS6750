const Product = require("../models/product");
const Cart = require("../models/cart");
const bulkProducts = require("../data/bulk-add-products");
const { Op } = require("sequelize");

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;

  // Product.findAll({ where: { id: prodId } })
  //   .then((products) => {
  //     res.render("shop/product-detail", {
  //       product: products[0],
  //       pageTitle: products.title,
  //       path: "/products",
  //     });
  //   })
  //   .catch((err) => console.log(err));

  Product.findByPk(prodId)
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(
          (prod) => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: cartProducts,
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect("/cart");
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect("/cart");
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};

exports.getQueryPractice = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/query-practice", {
        prods: products,
        pageTitle: "Query Practice",
        path: "/query-practice",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.bulkAddProducts = (req, res, next) => {
  Product.bulkCreate(bulkProducts)
    .then((result) => {
      console.log("Products Created!");
      res.redirect("/products");
    })
    .catch((err) => console.log(err));
};

exports.prodsStartWithC = (req, res, next) => {
  Product.findAll({ where: { title: { [Op.startsWith]: "C" } } })
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "Products Starting With C",
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.betweenTwoPrices = (req, res, next) => {
  Product.findAll({ where: { price: { [Op.between]: [100, 200] } } })
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "Products Between $100 & $200",
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.containsWordYour = (req, res, next) => {
  const value = "your";
  Product.findAll({ where: { description: { [Op.like]: "%your%" } } })
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "Contains Word Your",
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.increasePrice = (req, res, next) => {
  console.log("Hits method");
  Product.findOne({ where: { title: { [Op.like]: "%blender%" } } })
    .then((product) => {
      product.price = (product.price + 10).toFixed(2);
      return product.save();
    })
    .then((product) => {
      console.log("Blenders Updated!");
      res.redirect('/products');
    })
    .catch((err) => console.log("error",err));
};

exports.deleteAllProducts = (req, res, next) => {
  Product.destroy({truncate: true}).then(result => {
    console.log("PRODUCTS DELETEC");
    res.redirect('/products');
  }).catch(err => console.log(err));
}
