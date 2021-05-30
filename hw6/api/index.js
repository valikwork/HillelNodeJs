const { Router } = require('express');
const messagesModule = require('./messages');
const router = Router()
const { isCelebrateError } = require('celebrate');
const authModule = require('./auth')

router.use('/auth', authModule)
router.use('/messages', messagesModule)

router.use((err, req, res, next) => {
    if(isCelebrateError(err)){
        const [field, error] = err.details.entries().next().value;
        return res.status(406).json({ message: error.message, field })
    }
    res.status(err.code || 400).json({ message: err.message })
})

module.exports = router;