const { Router } = require('express');
const { validate } = require('../middlewares');
const { registerUserValidation, loginUserValidation } = require('./auth.validation');
const { loginUserCtrl, registerUserCtrl } = require('./auth.controller');
const router = Router()

router.get('/', (req, res) => {
    res.send("Auth")
})
router.post('/login', validate(loginUserValidation), loginUserCtrl)
router.post('/register', validate(registerUserValidation), registerUserCtrl)

module.exports = router;