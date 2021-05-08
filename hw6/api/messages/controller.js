

exports.getMessages = (req, res, next) => {
    res.send(req.app.locals.messages)
}

exports.postMessage = (req, res, next) => {
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