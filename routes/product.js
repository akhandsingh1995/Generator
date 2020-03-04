var services = require('../controller/product_services')
const express = require('express')
const router = express.Router()

// Create the Products by product Id

router.post('/create', function(req, res) {
    services.create_product(req, res);
})

// Show the product updation

router.put('/update/:id', function(req, res) {
    services.update_product(req, res);
})

// Delete the Product by the product Id

router.delete('/delete/:id', function(req, res) {
    services.delete_product(req, res);
})

// Update the Product by the product Id

router.get('/:id', function(req, res) {
    services.show_user_products(req, res);
})

module.exports = router;