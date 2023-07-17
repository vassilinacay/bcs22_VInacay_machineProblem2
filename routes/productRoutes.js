const express = require('express');
const router = express.Router();
const productController = require('../controllers/productControllers');
const auth = require('../auth'); 

router.get('/', (req, res) => {
  productController.allProducts(req.body)
	.then(resultfromController => res.send(resultfromController))
});

router.post('/', (req, res) => {
	productController.createProduct(req.body)
	  .then(resultfromController => res.send(resultfromController))
  });

router.get('/all-active', (req, res) => {
  productController.allActiveProducts(req.body)
	.then(resultfromController => res.send(resultfromController))
});

router.get('/:productId', (req, res) => {
	console.log(req.params.id)
  productController.getProduct(req.body)
	.then(resultfromController => res.send(resultfromController))
});


router.put('/:productId', (req, res) => {
  productController.updateProduct(req.body)
	.then(resultfromController => res.send(resultfromController))
});

router.put('/:productId/archive', (req, res) => {
  productController.archiveProduct(req.body)
	.then(resultfromController => res.send(resultfromController))
});

module.exports = router;