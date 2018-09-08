const router = require('koa-router')()

router.prefix('/users')

router.get('/login', function (ctx, next) {
  ctx.body = 'login!'
})

router.get('/register', function (ctx, next) {
  ctx.body = 'register!'
})

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
