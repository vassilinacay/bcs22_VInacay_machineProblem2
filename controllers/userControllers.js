const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const auth = require('../auth.js');
const Order = require('../models/order.js');
const Product = require('../models/product.js');

module.exports.registerUser = (reqBody) => {
    const user = (new User({
        email: reqBody.email,
        password: bcrypt.hashSync(reqBody.password, 10)
    })).save();
    user.password = "";
    return user;
}

module.exports.loginUser = (reqBody) => {
    const result = User.findOne({email: reqBody.email});
    if (!result) return {error: "Not found"};

    return bcrypt.compareSync(reqBody.password, result.password) ? {
        access: auth.createAccessToken(result)
    } : {error: "Invalid password"};
}

module.exports.getProfile = (reqBody) => {
    const result = User.findById(reqBody.id);
    if (!result) return {error: "Not found"};
    result.password = "";

    return result;
}

module.exports.checkout = (user, reqbody) => {
    if (!reqbody.products) throw "Invalid Request";
    let containedProducts = [];
    for (const i in reqbody.products) {
        const productInfo = reqbody.products[i];
        const product = Product.findById(productInfo.id);
        product.stock -= productInfo.quantity;
        Product.findByIdAndUpdate(productInfo.id, {stock: product.stock});
        containedProducts.push({
            productId: productInfo.id,
            quantity: productInfo.quantity,
        })
    }
    return (new Order({
        userId: user._id,
        products: containedProducts,
    })).save()
}

module.exports.getAllOrders = (reqBody) => {
    return Order.find();
}

module.exports.getMyOrders = (reqBody) => {
    return Order.find({userId: user_id.reqBody});
}

module.exports.setAdmin = (ser_id, admin_status = true) => {
    User.findByIdAndUpdate(user_id, {isAdmin: admin_status});
    return User.findById(user_id);
}