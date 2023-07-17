const express = require('express');
const User = require('../models/user.js');
const userControllers = require('../controllers/userControllers.js');
const auth = require('../auth'); 
const router = express.Router();

router.post('/register', async (req, res) => {
    userControllers.registerUser(req.body)
	.then(resultfromController => res.send(resultfromController))
});

router.post('/login', async (req, res) => {
    userControllers.loginUser(req.body)
	.then(resultfromController => res.send(resultfromController))
});

router.get('/:id/details', async (req, res) => {
    userControllers.getProfile(req.body)
	.then(resultfromController => res.send(resultfromController))
});


router.post('/checkout', async (req, res) => {
	await authenticateHeaders(req);
    userControllers.checkout(User.findById(req.user_id), req.body)
    .then(resultfromController => res.send(resultfromController))
});

router.get('/orders', async (req, res) => {
	if (!await isAdmin(req)) return res.status(403).json({error: "Forbidden"});
    userControllers.getAllOrders()
    .then(resultfromController => res.send(resultfromController))
});

router.get('/myOrders', async (req, res) => {
	await authenticateHeaders(req);
    userControllers.getMyOrders(req.user_id)
    .then(resultfromController => res.send(resultfromController))
});

router.put('/:id/setAsAdmin', async (req, res) => {
	if (!await isAdmin(req)) return res.status(403).json({error: "Forbidden"});
    userControllers.setAdmin(req.params.id, req.body.status || true)
    .then(resultfromController => res.send(resultfromController))
});

module.exports = router;