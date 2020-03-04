const db = require('./db');



var reviewSchema = db.Schema({
    review_message: { type: String, required: true, trim: true },
    product_id: { type: String, required: true, trim: true }
});


// compilation of schema 
module.exports = db.model('review', reviewSchema)