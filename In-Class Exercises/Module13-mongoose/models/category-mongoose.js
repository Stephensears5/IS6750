const slugify = require('slugify');
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    set: function(value) {
        //set the slug
        this.slug = slugify(value, {lower: true, trim: true})
        //return the value that should be used for the name property
        return value;
    }
  },
  image: {
    type: String,
    required: true,
  },
  slug: { type: String, required: true },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "MenuItem",
    },
  ],
});

module.exports = mongoose.model("Category", categorySchema, "categories");
