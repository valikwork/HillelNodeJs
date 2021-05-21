const { celebrate } = require("celebrate")

exports.validation = (schema, options = {}) => {
    
    return celebrate(schema, {
        ...options,
        stripUnknown: { objects: true },
    })
}