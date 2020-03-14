const db = require('./db');
const validator = require('validator');
const mongoose = require('mongoose');
var user = db.Schema({
    f_name: { type: String, required: true, trim: true },
    l_name: { type: String, required: true, trim: true },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email',
            isAsync: false
        }
    },
    password: { type: String, required: true, trim: true }
});


user.methods.toJSON = function() {

    var object1 = this.toObject();
    delete object1.password;
    // delete object1._id;
    // delete object1.__v;


    return object1;
}

// compilation of schema 
module.exports = db.model('user', user)