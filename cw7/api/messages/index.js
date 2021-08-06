const { Router } = require('express');
const { validation } = require('../middlewares');
const { getMessages, postMessage, getMessageByID, putMessageByID, deleteMessageByID } = require('./controller');
const { checkMessageIdValidation, addMessageIdValidation, updateMessageIdValidation } = require('./validation');
const router = Router()

router.get('/', getMessages)
router.post('/', validation(addMessageIdValidation), postMessage)
router.get('/:message_id', validation(checkMessageIdValidation), getMessageByID)
router.put('/:message_id', validation(updateMessageIdValidation), putMessageByID)
router.delete('/:message_id', validation(checkMessageIdValidation), deleteMessageByID)




module.exports = router;