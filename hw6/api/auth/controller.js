
exports.getCurrentUser = (req, res, next) => {
    const { login } = req.signedCookies;
    if(!login){
        next({
            code: 401,
            message: "Unauthorized"
        })
        return;
    }
    res.send({ user: login })
}

exports.loginUser = (req, res, next) => {
    res.cookie('login', req.body.username, { expires: new Date(Date.now() + 300000),httpOnly: true, signed: true })
    res.send({
        message: 'Login success'
    })
}

exports.logoutUser = (req, res, next) => {
    res.clearCookie('login')
    req.app.locals.isUserLogged = false;
    res.send({
        message: 'Logout success'
    })
}