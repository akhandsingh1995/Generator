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
            //id : 101,
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
    // // content that help to convert the body data into the string

    // var content = JSON.parse(req.body.toString())

    // var dataS = {
    //     f_name: content.f_name,
    //     l_name: content.l_name,
    //     email: content.email
    // };

    // // Validate if the user are registered than the message are show user registered otherwise create the users
    // db.find({ email: content.email }, (err, docs) => {
    //     if (docs.email == content.email) {
    //         res.json({
    //             success: false,
    //             message: 'Email already Existed'
    //         });

    //     } else if (docs.length) {
    //         var obj = new db({
    //             f_name: content.f_name,
    //             l_name: content.l_name,
    //             email: content.email,
    //             password: bcrypt.hashSync(content.password, 10),
    //         })
    //         obj.save((err, data) => {
    //             if (!err) {
    //                 res.json({
    //                     sucess: true,
    //                     message: "User Add Successfully",
    //                     data: dataS
    //                 })
    //             } else res.json({
    //                 sucess: false,
    //                 message: "User Not Added",

    //             })
    //         })
    //     } else {
    //         var obj = new db({
    //             f_name: content.f_name,
    //             l_name: content.l_name,
    //             email: content.email,
    //             password: bcrypt.hashSync(content.password, 10),

    //         })
    //         obj.save((err, data) => {
    //             if (!err) {
    //                 res.json({
    //                     sucess: true,
    //                     message: "User Add Successfully",
    //                     data: dataS
    //                 })
    //             } else {
    //                 res.json({
    //                     sucess: false,
    //                     message: "User not Added"
    //                 })
    //             }
    //         })
    //     }
    // })

}

// exports.log_in = (req, res) => {
//     jwt.verify(req.headers.authorization, conn[1].key, (err, decoded) => {
//         var content = JSON.parse(req.body.toString())
//         db.findOne({ email: content.email }, function(err, docs) {
//             if (docs === null) {
//                 return res.status(403).json({ error: 'No credentials sent!' });
//             } else {
//                 if (!bcrypt.compareSync(content.password, docs.password)) {
//                     return res.status(403).json({ error: 'No credentials sent!' });
//                     console.log(!bcrypt.compareSync(content.password, docs.password))
//                 } else {
//                     res.json({
//                         success: true,
//                         message: "Successfull Login",
//                         data: content.email

//                     })
//                 }
//             }
//         })
//     })

// }

exports.tokeninn = (req, res) => {

    var content = req.body
    db.findOne({ email: content.email }, (err, data) => {

        if (!data) {
            res.json({
                sucess: false,
                message: "Incorrect login"
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