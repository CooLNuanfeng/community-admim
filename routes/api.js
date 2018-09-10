const router = require('koa-router')();
const loginReg = require('../apimodels/loginReg');

router.prefix('/api');

router.post('/login', loginReg.loginUser)

router.post('/register',loginReg.insertUser);


module.exports = router
