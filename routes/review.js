var services = require('../controller/reviews_services')
const express = require('express')
const router = express.Router()

// Create the Reviews by product Id

router.post('/reviews/:p_id', function(req, res) {
    services.create_review(req, res);
})

// Show the product reviews

router.get('/reviews/:p_id', function(req, res) {
    services.show_product_reviews(req, res);
})

// Delete the reviews by the product Id

router.get('/reviews/delete/:p_id/:id', function(req, res) {
    services.delete_review(req, res);
})

// Update the reviews by the product Id

router.get('/reviews/update/:p_id/:id', function(req, res) {
    services.update_review(req, res);
})

module.exports = router;