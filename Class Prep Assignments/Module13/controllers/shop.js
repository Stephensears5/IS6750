const Product = require('../models/product');
const Order = require('../models/order');
const bulkProducts = require('../data/bulk-add-products.json');

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      // console.log(products);
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    // .execPopulate()
    .then(user => {
      const products = user.cart.items;
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
      });
    })
    .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      console.log(result);
      res.redirect('/cart');
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {
  req.user
  .populate('cart.items.productId')
  // .execPopulate()
  .then(user => {
    console.log(user.cart.items);
    const products = user.cart.items.map(i => {
      return {quantity: i.quantity, product: {...i.productId._doc}};
    });
    const order = new Order({
      user: {
        name: req.user.name,
        userId: req.user
      }, 
      products: products
    });
    return order.save();
  })
  .then(result => {
    req.user.clearCart();
    })
    .then(() => {
      res.redirect('/orders');
    })
    .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  Order.find({"user.userId": req.user._id}).then(orders => {
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders',
      orders: orders
    });
  })
  .catch(err => console.log(err));  
};

//PRACTICE BELOW THIS LINE
exports.getQueryPractice = (req, res, next) => {
  Product.find()
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
  Product.create(bulkProducts)
    .then((result) => {
      console.log("Products Created!");
      res.redirect("/products");
    })
    .catch((err) => console.log(err));
};

exports.prodsStartWithC = (req, res, next) => {
  Product.find({title: /^C/})
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
  Product.find({price: { $gte: 100, $lte: 200}})
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
  Product.find({description: /your/i})
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
  Product.findOne({ title: /blender/i})
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
  Product.deleteMany().then(result => {
    console.log("PRODUCTS DELETED");
    res.redirect('/products');
  }).catch(err => console.log(err));
}
