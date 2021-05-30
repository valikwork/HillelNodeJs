const { Router } = require('express');
const { emailConfirmationCtrl } = require('./user.controller');
const router = Router()

router.get('/', (req, res) => {
    res.send("User")
})

router.get('/confirm', emailConfirmationCtrl)

module.exports = router;