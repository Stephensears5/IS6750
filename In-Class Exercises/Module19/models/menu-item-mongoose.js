const { Int32, Decimal128 } = require('mongodb');
const slugify = require('slugify');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const menuItemSchema = new Schema(
    {
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
        description: {
            type: String,
            required: true
        },
        price: {
            type: Decimal128,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        slug: { type: String, required: true }
    }
);

module.exports = mongoose.model('MenuItem', menuItemSchema)