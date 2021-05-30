const UserModel = require("./user.model");
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../../config')

exports.emailConfirmationCtrl = async (req, res, next) => {
    try {
        if(req.query.email_conf_code){
            const result = jwt.verify(req.query.email_conf_code, jwtSecret);
            const userExist = await UserModel.exists({_id: result.id});
            if(userExist){
                UserModel.findOneAndUpdate({_id: result.id}, {email_verified: true}, {new: true}, (err, doc) => {
                    if (err) {
                        res.status(404).send('Something wrong when updating data!');
                    }
                    res.send({
                        message: "Your email has been confirmed",
                        user: result.id
                    })
                })
            } else {
                res.status(404).send('This User is not registered');
            }
        } else {
            res.status(401).send('No Confirmation Code was presented');
        }
    } catch (error) {
        next(error)
    }
}