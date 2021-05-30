const { celebrate } = require("celebrate")

exports.validate = (schema, options = {}) => {
    return celebrate(schema, {...options, stripUnknown: { objects: true }})
}