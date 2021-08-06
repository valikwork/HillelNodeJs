const { Router } = require('express');
const { validation } = require('../middlewares');
const { loginUser, logoutUser, getCurrentUser } = require('./controller');
const { loginUserValidation } = require('./validation');
const router = Router()

router.get('/', getCurrentUser)

router.post('/login', validation(loginUserValidation), loginUser)

router.get('/logout', logoutUser)

module.exports = router;