const MessagesModel = require('./model')

exports.getMessages = (req, res, next) => {
    MessagesModel.find({}).lean().exec((err, docs) => {
        res.send(docs)
    })
}

exports.postMessage = async (req, res, next) => {
    // const { login } = req.signedCookies;
    // if (!login) {
    //     next({
    //         code: 401,
    //         message: 'Unauthorized'
    //     });
    //     return;
    // }

    try {
        const message = new MessagesModel(req.body)
        console.log(message);
        res.send(await message.save())
    } catch (error) {
        next(error)
    }
}

exports.getMessageByID = async (req, res, next) => {
    try {
        const { message_id } = req.params;
        const message = await MessagesModel.findById(message_id).lean().exec()
        if(!message){
            return next({
                code: 404,
                message: "Message was not found"
            })
        }
        res.send(message)
    } catch (error) {
        next(error)
    }
}

exports.putMessageByID = async (req, res, next) => {
    try {
        const { message_id } = req.params;
        const message = await MessagesModel.findById(message_id).exec()
        Object.assign(message, req.body)
        res.send(await message.save())
    } catch (error) {
        next(error)
    }
    // res.send(req.app.locals.messages);
}

exports.deleteMessageByID = async (req, res, next) => {
    try {
        const { message_id } = req.params;
        const message = await MessagesModel.findByIdAndDelete(message_id).exec()
        res.send(message)
    } catch (error) {
        next(error)
    }
}