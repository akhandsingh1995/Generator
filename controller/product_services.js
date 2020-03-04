var db_product = require('../models/product_schema')
var db = require('../models/user_schema')
const conn = require('../bin/config.json');
var jwt = require('jsonwebtoken')


//To Create New Product
try {
    exports.create_product = (req, res) => {
        var content = req.body

        jwt.verify(req.headers.authorization, conn[1].key, (err, data) => {
            var data1 = {
                f_name: data.f_name,
                l_name: data.l_name,
                email: data.email
            }
            var obj = new db_product({
                p_name: content.p_name,
                p_desc: content.p_desc,
                p_image: content.p_image,
                obj_id: data.id,
                reviews: content.reviews
            })
            var datab = {
                p_name: content.p_name,
                p_desc: content.p_desc,
                p_image: content.p_image,
                user: data1
            }
            db_product.findOne({ p_name: content.p_name }, (err, docs) => {
                if (docs) {
                    res.json({
                        success: false,
                        message: "Product Already Exists"
                    })
                } else {
                    obj.save((err, data) => {
                        if (!err) {
                            return res.json({
                                sucess: true,
                                message: "Product Added Successfully",
                                data: datab
                            })
                        } else {
                            return res.json({
                                sucess: false,
                                message: "Product Not Added"
                            })
                        }
                    })
                }
            })
        })
    }
} catch (err) {
    console.log(err);
}



exports.delete_product = (req, res) => {
    jwt.verify(req.headers.authorization, conn[1].key, (err, data) => {
        var p_id = req.params.id

        db_product.deleteOne({ _id: p_id }, function(err, doc) {
            if (doc.deletedCount === 0) {

                return res.json({
                    sucess: false,
                    message: "Product Not Found"
                });

            } else {
                return res.json({
                    sucess: true,
                    message: "Product Deleted",
                    data: [""]
                })
            }
        })
    })

}


exports.update_product = (req, res) => {
    jwt.verify(req.headers.authorization, conn[1].key, (err, data) => {
        var data11 = {
            f_name: data.firstName,
            l_name: data.lastName,
            email: data.email
        }
        var pro_id = req.params.id
        var content = req.body
        db_product.findOneAndUpdate({ _id: pro_id }, content, function(err, doc) {
            var datab = {
                p_id: pro_id,
                p_name: doc.p_name,
                p_desc: doc.p_desc,
                p_image: doc.p_image,
                reviews: doc.reviews,
                user: data11
            }
            if (doc === null) {

                return res.json({
                    success: false,
                    message: "Product Id Not Matched"
                })

            } else {
                res.json({
                    success: true,
                    message: "Product Updated Successfully",
                    data: datab
                })

            }
        })
    });

}


// Show the product of the user

exports.show_user_products = (req, res) => {
    jwt.verify(req.headers.authorization, conn[1].key, (err, data) => {
        // var id = req.params.id;
        // db_product.
        // findOne({ _id: id }).
        // populate('user').
        // exec(function(err, data) {
        //     if (err) return handleError(err);
        //     if (data.length) {
        //         return res.json({
        //             sucess: true,
        //             message: "Products  are Displayed",
        //             data: data
        //         })
        //     } else {
        //         res.send('no product for uthis user id')
        //     }
        // });

        db_product.find({}).
        populate('obj_id').
        exec(function(err, doc) {
            res.send(doc)
        })
    })

}