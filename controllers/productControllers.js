const Product = require("../models/product.js");
const bcrypt = require('bcrypt');
const auth = require('../auth.js');

module.exports.createProduct = (body) => {
    return (new Product({
        name: body.name,
        description: body.description,
        stock: body.stock
    })).save();
}

module.exports.allProducts = (filter = undefined) => {
    return Product.find(filter);
}

module.exports.allActiveProducts = () => {
    return Product.find({isActive: true});
}

module.exports.getProduct = (id) => {
    return Product.findOne(id);
}

module.exports.updateProduct = (id, newDetails) => {
    Product.findByIdAndUpdate(id, newDetails);
    return Product.findById(id);
}

module.exports.archiveProduct = (id) => {
    Product.findByIdAndUpdate(id, {isActive: false});
    return Product.findById(id);
}

