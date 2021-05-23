const { registerUser, compareUserPassword } = require("../user/user.service");

exports.loginUserCtrl = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await compareUserPassword(email, password)
        res.send({
            message: "You are logged in",
            user: user._id
        })
    } catch (error) {
        next(error)
    }
};

exports.registerUserCtrl = async (req, res, next) => {
    try {
        const { email, password, firstName, lastName } = req.body;
        const user = await registerUser(email, password, firstName, lastName)
        res.json({
            message: "register success",
            id: user._id
        })
    } catch (error) {
        next(error)
    }
}