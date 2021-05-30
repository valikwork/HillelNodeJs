const { Segments } = require("celebrate");
const Joi = require("joi");

const loginUserValidation = {
    [Segments.BODY]: {
        email: Joi.string().trim().email().required(),
        password: Joi.string().trim().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/).required(),
    }
}
exports.loginUserValidation = loginUserValidation;

exports.registerUserValidation = {
    [Segments.BODY]: {
        ...loginUserValidation[Segments.BODY],
        firstName: Joi.string().trim().max(256),
        lastName: Joi.string().trim().max(256)
    }
}