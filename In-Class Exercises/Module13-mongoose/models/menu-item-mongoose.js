const { Int32, Decimal128 } = require('mongodb');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const menuItemSchema = new Schema(
    {
        name: {
            type: String,
            required: true
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
        }
        //,
        // slug: {
        //     type: String,
        //     ref: slugify(this.name, {lower: true, trim: true})
        // }
    }
);

module.exports = mongoose.model('MenuItem', menuItemSchema)