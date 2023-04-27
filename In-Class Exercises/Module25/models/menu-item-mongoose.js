const mongoose = require('mongoose');
const slugify = require('slugify');

const Schema = mongoose.Schema;

// Schema defines what the object should look like in database
const menuItemSchema = new Schema({
    name: {
        type: String,
        required: true,
        set: function(v) { 
            this.slug = slugify(v, {lower: true, trim: true})
            return v;
        }
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    slug: {
        type: String
    }
    
})


// Model implements the schema and provides functions for working with the objects
module.exports = mongoose.model('MenuItem', menuItemSchema);