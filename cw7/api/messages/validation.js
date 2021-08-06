const { Segments } = require("celebrate")
const Joi = require('joi');

const checkMessageIdValidation = {
    [Segments.PARAMS]: Joi.object().keys({
        message_id: Joi.string().regex(/^[a-f0-9]{24}$/i).required()
    })
}
exports.checkMessageIdValidation = checkMessageIdValidation

const addMessageIdValidation = {
    [Segments.BODY]: Joi.object().keys({
        text: Joi.string().min(3).max(255).required(),
        user: Joi.string().min(3).max(255).required()
    })
}
exports.addMessageIdValidation = addMessageIdValidation

const updateMessageIdValidation = {
    ...checkMessageIdValidation,
    ...addMessageIdValidation
}
exports.updateMessageIdValidation = updateMessageIdValidation
