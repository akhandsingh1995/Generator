var db = require('../models/user_schema');
const conn = require('../bin/config.json');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

exports.register = (req, res) => {

    try {
        var jsonParse = req.body;
        const fName = jsonParse.f_name;
        const lName = jsonParse.l_name;
        const email = jsonParse.email;
        const pwd = jsonParse.password;

        reg = new db({

            f_name: fName,
            l_name: lName,
            email: email,
            password: pwd
        });

        var userInfo = {
            firstName: fName,
            lastName: lName,
            email: email
        };

        if (fName && lName && email && pwd) {
            db.findOne({ email: email }).exec()
                .then(result => {
                    if (result) {
                        res.json({
                            success: false,
                            message: "User already registered !",
                            data: {}
                        })
                    } else {
                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(reg.password, salt, (err, hash) => {
                                if (err) throw err;
                                reg.password = hash;
                                reg.save().then(res => {
                                    console.log(res);
                                });
                            });
                        });
                        res.json({
                            success: true,
                            message: "User Registered Successfully",
                            data: userInfo
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                    return;
                });
        } else {
            res.json('Error! All fields requied!');
        }
    } catch (err) {
        console.log('Error is', err);
        res.send("Error");
    }

}


var tokenGen = (req, res) => {

    var content = req.body;
    db.findOne({ email: content.email }, (err, data) => {

        if (!data) {
            res.json({
                success: false,
                message: "User not Existed"
            })
        } else {
            var token = jwt.sign({
                id: data._id,
                firstName: data.f_name,
                lastName: data.l_name,
                email: data.email,
            }, conn[1].key, { expiresIn: 600 * 600 });

            res.json({
                success: true,
                message: "Token Generated successfully",
                token: token

            })

        }
    })
}

exports.log_in = (req, res) => {
    var bearerHeader = req.headers.authorization;
    console.log(bearerHeader)
    if (bearerHeader == undefined) {
        console.log('Here2');

        tokenGen(req, res);
    } else {
        jwt.verify(bearerHeader, conn[1].key, (err, decoded) => {
            if (err) {
                console.log(err);
                res.json({
                    success: false,
                    statusCode: 403, // Forbidden 403
                    message: 'Token Not found'
                })
            } else {
                var content = req.body;
                db.findOne({ email: content.email }, (err, data) => {
                    if (data === null)
                        return res.status(403).json({ error: 'No user existed' });
                    else {
                        if (bcrypt.compareSync(content.password, data.password)) {
                            res.json({
                                success: true,
                                message: "Successful Login",
                                data: content.email
                            })
                        } else {
                            return res.status(403).json({ error: 'Password Mismatch!' });
                        }
                    }
                })
            }

        })

    }
}