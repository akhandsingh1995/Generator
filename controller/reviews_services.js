var db = require('../models/review_schema')
var db_product = require('../models/product_schema')
const conn = require('../bin/config.json');
var jwt = require('jsonwebtoken')


// To Create the Product Reviews by the product Id

exports.create_review = (req, res) => {
    var content = req.body

    db_product.findOne({ _id: req.params.p_id }, function(err, docs) {

        if (docs == null) {
            var obj = new db({
                review_message: content.review_message,
                product_id: req.params.p_id
            })
            obj.save((err, data) => {
                if (!err) { res.send('review added') } else { res.send('review not added') }
            })
        } else {
            res.send('product not exist')
        }
    })

}

// Update the reviews according to product Id

exports.update_review = (req, res) => {

    var content = req.body

    db.findOneAndUpdate({ review_id: req.params.id, product_id: req.params.p_id }, content, { new: true }, function(err, doc) {
        if (doc === null) {

            res.send("product review or review id not exist");

        } else {
            res.send("review updated");

        }

    })
}

// Delete the product reviews by the product Id

exports.delete_review = (req, res) => {

    db.deleteOne({ review_id: req.params.id, product_id: req.params.p_id }, function(err, doc) {
        if (doc.deletedCount === 0) {

            res.send("product review or review id not exist");

        } else {
            res.send("review deleted");

        }

    })
}

// Showing the revies of the particular product according to its product Id

exports.show_product_reviews = (req, res) => {
    jwt.verify(req.headers.authorization, conn[1].key, (err, data) => {

        // var u_id = req.params.p_id
        // db.find({ product_id: u_id }, function(err, doc) {
        //     if (doc.length) {
        //         res.send(doc)
        //     } else {
        //         res.send('no review for this user product')
        //     }

        db_product.find({}).
        populate('obj_id').
        exec(function(err, doc) {
            res.send(doc)
        })
    })

}