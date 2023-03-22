const Product = require('../models/product');
const Order = require('../models/order');
const bulkProducts = require('../data/bulk-add-products.json');


exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      console.log(products);
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
      const products = user.cart.items.map(i => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
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
      return req.user.clearCart();
    })
    .then(() => {
      res.redirect('/orders');
    })
    .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  Order.find({ 'user.userId': req.user._id })
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
    })
    .catch(err => console.log(err));
};

//Additional handler functions for last part of assignment

exports.getQueryPractice = (req, res, next) => {
  res.render('shop/query-practice', {
    pageTitle: 'Query Practice',
    path: '/querypractice'
  });
}

exports.bulkCreate = (req, res, next) => {
  Product.create(bulkProducts)
  .then(result => {
    console.log(result);
    res.redirect('/products')
  })
  .catch(err => console.log(err));
}

exports.startsWithC = (req, res, next) => {
  Product.find( {
    title: {$regex : '^C'}    
  })
  .then(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'Products starting with C',
      path: '/products'
    });
  })
  .catch(err => console.log('An error occurred!', err));
}

// // Async/await version
// // exports.startsWithC = async (req, res, next) => {
// //   try {
// //     let products = await Product.findAll({where: {
// //       title: {[Op.startsWith] : 'C'}    
// //     }});
    
// //       res.render('shop/product-list', {
// //         prods: products,
// //         pageTitle: 'Products starting with C',
// //         path: '/products'
// //       });
// //   } catch (err) {
// //     console.log("An error occurred!", err)
// //   } 
// // }

exports.between100and200 = (req, res, next) => {
  Product.find({price: {$gte: 100, $lte: 200}})
  .then(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'Products between $100 and $200',
      path: '/products'
    });
  })
  .catch(err => console.log('An error occurred!', err));
}

exports.containsYour = (req, res, next) => {
  Product.find({description: {$regex : 'your'}})
  .then(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'Products containing \'your\'',
      path: '/products'
    });
  })
  .catch(err => console.log('An error occurred!', err));
}

exports.increaseBlenderPrice = (req, res, next) => {
  Product.findOne({title: 'Blender'})
    .then((product) => {
    console.log(product);
    product.price = product.price + 10;
    return product.save();})
    .then(() => {
      res.redirect('/products');
    })
    .catch(err => console.log(err));
}

exports.deleteAllProducts = (req, res, next) => {
  Product.deleteMany()
  .then(result => {
    console.log(result);
    res.redirect('/products');
  }).catch(err => console.log(err));
}
