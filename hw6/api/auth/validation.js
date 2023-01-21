const { Segments } = require("celebrate");
const Joi = require("joi");

exports.loginUserValidation = {
    [Segments.BODY]: Joi.object().keys({
        username: Joi.string().min(3).max(50).required()
    })
}