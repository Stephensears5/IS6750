const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
// const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('6417e6182498d8ef6db987c0')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect(
"mongodb+srv://new_user_1:xqu6BNQNUGmQyskB@cluster0.7atvcn4.mongodb.net/shop?retryWrites=true&w=majority"
)
.then( result =>{
  User.findOne().then(user => {
    if(!user) {
      const user = new User({
        name: 'Stephen', 
        email: "a01234875@aggies.usu.edu",
        cart: {
          items: []
        }
      })
      user.save();
    }
  });
  app.listen(3000)
}
  
)
.catch(err => console.log(err));
