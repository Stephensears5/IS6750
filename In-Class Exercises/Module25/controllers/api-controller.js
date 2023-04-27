const jwt = require("jsonwebtoken");
const userMongoose = require("../models/user-mongoose");

exports.getToken = (req, res, next) => {
  let doMatch = res.locals.doMatch;
  let user = res.locals.user;
  if (doMatch && user) {
    //Generate the jwt
    const token = jwt.sign(
      { email: user.email, userId: user._id.toString() },
      "somesupersecretsecret",
      { expiresIn: "1h" }
    );
    res.status(200).json({ message: "Token Generated",data: { token: token, userId: user._id.toString()} });
  }
  else {
    res.status(403).json({message: 'Authentication failed.', data: null})
  }
};

exports.verifyToken = (req,res,next) => {
    const authHeader = req.get('Authorization');
    // console.log(authHeader);
    if(!authHeader){
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }
    const token = authHeader.split(' ')[1]; 
    let decodedToken;
    try{
        decodedToken = jwt.verify(token, 'somesupersecretsecret');
    }catch(err){
        err.statusCode = 500;
        throw err;
    }
    if(!decodedToken){
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }
    req.userId = decodedToken.userId;
    next();
}

exports.sendMenuJSON = (req, res, next) => {
  const categories = res.locals.categories;

  // Make sure data exists
  if (!categories) {
    // Send an error message
    res
      .status(500)
      .json({
        message: "An error occurred.  No menu data retrieved.",
        data: null,
      });
  }
  // Send back the data
  res.json({ message: "Success!", data: categories });
};

exports.sendCategoryJSON = (req, res, next) => {
  const selectedCategory = res.locals.selectedCategory;

  // Make sure data exists
  if (!selectedCategory) {
    // Send an error message
    res
      .status(500)
      .json({
        message: "An error occurred.  No category data retrieved.",
        data: null,
      });
  }
  // Send back the data
  res.json({ message: "Success!", data: selectedCategory });
};
