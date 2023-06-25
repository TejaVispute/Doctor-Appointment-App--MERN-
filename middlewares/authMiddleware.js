const JWT = require('jsonwebtoken');


module.exports = async (req, res, next) => {

    try {
        const token = req.headers['authorization'].split(' ')[1];
        // console.log(token)

        JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(200).send({
                    message: 'User not authorized',
                    success: false,
                })
            } else {
                console.log(req.body.userId, '17 middlewares')
                req.userId = decode.id
                next()

            }
        })
    } catch (error) {
        console.log(error,)
        res.status(401).send({
            message: 'Auth Failed',
            success: false,
        })
    }
}