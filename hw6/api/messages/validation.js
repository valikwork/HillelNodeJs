const { Segments } = require("celebrate")
const Joi = require('joi');

const checkMessageIdValidation = {
    [Segments.PARAMS]: Joi.object().keys({
        message_id: Joi.number().positive().integer().required()
    })
}
exports.checkMessageIdValidation = checkMessageIdValidation

const addMessageIdValidation = {
    [Segments.BODY]: Joi.object().keys({
        text: Joi.string().alphanum().min(3).max(255).required()
    })
}
exports.addMessageIdValidation = addMessageIdValidation

const updateMessageIdValidation = {
    ...checkMessageIdValidation,
    ...addMessageIdValidation
}
exports.updateMessageIdValidation = updateMessageIdValidation
