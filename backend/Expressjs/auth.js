const jwt = require('jsonwebtoken');
require('dotenv').config();
const keys=process.env.key;
module.exports = async function(req, res, next) {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    let token;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
        console.log(token);
    } else {
        return res.status(401).json({ msg: 'Authorization header not provided or malformed' });
    }

    try {
        const decoded = jwt.verify(token, keys);
        console.log(decoded);

 
        if (!req.user) {
            req.user = {};
        }

        req.user.id = decoded.user.id;  
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ msg: 'Token has expired' });
        } else {
            console.error(error);
            return res.status(401).json({ msg: 'Token is not valid' });
        }
    }
};
