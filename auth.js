const User = require("./models/user");
const jwt = require('jsonwebtoken');
const secret = 'bcsAN22';

module.exports.createAccessToken = (user) => {
    const accessToken = jwt.sign({ id: user._id }, secret);
    return accessToken;
};

module.exports.authenticateToken = (token) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, {}, (err, decoded) => {
        if (err) {
          reject("Invalid Token");
        } else {
          resolve(decoded);
        }
      });
    });
};

module.exports.authenticateHeaders = async (req) => {
    const token = req.headers.authorization;
    if (!token) {
      throw "Unauthorized.";
    }
    const [authScheme, authString] = token.split(" ");
    if (authScheme !== "Bearer") {
      throw "Unsupported Authorization.";
    }
    const data = await module.exports.authenticateToken(authString);
    req.user_id = data.id;
    return data;
  };
  
module.exports.isAdmin = async (req) => {
    await module.exports.authenticateHeaders(req);
    const user = await User.findById(req.user_id);
    return user.isAdmin;
};