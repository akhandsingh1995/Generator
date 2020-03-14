var services = require('../controller/user_services')
var ser = require('../controller/auth');
const express = require('express')
const router = express.Router()


// registered the users and its details

router.post('/register', function(req, res) {
    ser.register(req, res)
})

// users login details through the database

router.post('/login', function(req, res) {
    ser.log_in(req, res);
})

// Delete the user through user id

router.delete('/delete', function(req, res) {

    services.delete_user(req, res)

})

// update the user details through user id

router.put('/update', function(req, res) {
    services.update_user(req, res)
})

// get the users details through user id

router.get('/', (req, res) => {
    services.get_user(req, res)
})


module.exports = router;