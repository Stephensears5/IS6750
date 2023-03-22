const slugify = require('slugify');
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contactSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true,
        default: function(){
            return Date.now()
        }
    },
    response: {
        type: String,
        required: false
    },
    responseDate: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model("Contact", contactSchema, "contacts");
