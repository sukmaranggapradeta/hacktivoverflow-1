const { verifyToken } = require('../helpers/jwt')
const User = require('../models/userModel')
module.exports = function (req, res, next) {
    // console.log(req.headers);
    try {
        let decoded = verifyToken(req.headers.token);
        // console.log(decoded, "ini decoded")
        User.findOne({
            email: decoded.email
        })
            .then(user => {
                if (user) {
                    req.decoded = decoded;
                    next()
                } else {
                    throw { status: 401, messages: 'User is not valid' }
                }
            })
            .catch(next);
    } catch (error) {
        // console.log(error)
        // console.log('masuk catch')
        throw { status: 401, messages: 'Unauthenticated' }
    }
}