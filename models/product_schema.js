const db = require('./db');
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var productSchema = db.Schema({
    p_name: { type: String, required: true, trim: true },
    p_desc: { type: String, required: true, trim: true },
    p_image: { type: String, required: true },
    // obj_id: { type: Schema.Types.ObjectId, ref: "user" },
    reviews: { type: String }
});


// compilation of schema 
module.exports = db.model('product', productSchema)