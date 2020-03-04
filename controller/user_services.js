const bcrypt = require('bcryptjs')
const conn = require('../bin/config.json');
var db = require('../models/user_schema')
var jwt = require('jsonwebtoken')



// Delete the user by the user ID

exports.delete_user = (req, res) => {
    var currentuser = req.headers.authorization;

    jwt.verify(currentuser, conn[1].key, (err, data) => {
        db.deleteOne({ email: data.email }, function(err, doc) {

            if (doc.deletedCount === 0) {

                res.json({
                    sucess: false,
                    message: "User Not Found",
                    data: doc,
                })

            } else {
                res.json({
                    sucess: true,
                    message: "User Deleted successfully",
                    data: [""]
                })
            }
        })
    })

}


// Update the user to the user Id and upgrade the details 

exports.update_user = (req, res) => {
    var currentuser = req.headers.authorization;

    jwt.verify(currentuser, conn[1].key, (err, data) => {
        var bod = req.body
        console.log(data.id)
        db.findOneAndUpdate({ _id: data.id }, bod, { new: true }, function(err, data) {

            if (data) {
                return res.json({
                    sucess: true,
                    message: "User Updated Successfully",
                    data: data
                })

            } else {
                return res.json({
                    sucess: false,
                    message: "User not Updated"
                })

            }
        });

    })


}




// Get the user through the id

exports.get_user = (req, res) => {
    var currentuser = req.headers.authorization;
    jwt.verify(currentuser, conn[1].key, (err, data) => {

        var dataB = {
            f_name: data.firstName,
            l_name: data.lastName,
            email: data.email
        }
        db.findOne({ email: data.email }, function(err, data) {

            if (data === null) {

                return res.json({
                    sucess: false,
                    message: "User Not Exist",
                    data: [""]
                })

            } else {
                return res.json({
                    sucess: true,
                    message: "Users Get Successfully ",
                    data: dataB
                })

            }
        });
    })



}