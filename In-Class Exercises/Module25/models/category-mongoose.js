const mongoose = require("mongoose");
const slugify = require("slugify");

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    set: function (v) {
      this.slug = slugify(v, { lower: true, trim: true });
      return v;
    },
  },
  image: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "MenuItem",
    },
  ],
});

module.exports = mongoose.model("Category", categorySchema);
