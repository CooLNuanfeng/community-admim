const router = require('koa-router')()

router.get('/', async (ctx, next) => {
    ctx.redirect('/users/index');
})

module.exports = router
