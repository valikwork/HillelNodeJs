

exports.getMessages = (req, res, next) => {
    res.send(req.app.locals.messages)
}

exports.postMessage = (req, res, next) => {
    const { login } = req.signedCookies;
    if (!login) {
        next({
            code: 401,
            message: 'Unauthorized'
        });
        return;
    }
    const newMessage = {
        id: req.app.locals.messages.length + 1,
        text: req.body.text,
        sender: login,
        addedAt: Date.now()
    }
    req.app.locals.messages.push(newMessage);
    res.send(req.app.locals.messages);
}

exports.getMessageByID = (req, res, next) => {
    const message = req.app.locals.messages.find(e => e.id === req.params.message_id)
    if(!message){
        return next({
            code: 404,
            message: "Message was not found"
        })
    }
    res.send(message)
}

exports.putMessageByID = (req, res, next) => {
    res.send(req.app.locals.messages);
}

exports.deleteMessageByID = (req, res, next) => {
    res.send(req.app.locals.messages);
}