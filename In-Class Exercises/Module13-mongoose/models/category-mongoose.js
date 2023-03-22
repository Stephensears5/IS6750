const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  items: {
        itemId: {
          type: Schema.Types.ObjectId,
          ref: 'MenuItem'
        },
  },
});


module.exports = mongoose.model('Category', categorySchema, "categories")