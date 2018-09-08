const router = require('koa-router')()

router.prefix('/users')

router.get('/login', async(ctx, next) => {
    await ctx.render('pages/login', {
        title: '登录',
        username: 'blue'
    })
})

router.get('/register', async(ctx, next) => {
    await ctx.render('pages/register', {
        title: '注册'
    })
})

router.get('/bulletin', async(ctx, next) => {
    await ctx.render('pages/bulletin', {
        title: '公告',
        username: 'blue',
        currentUrl: '/users/bulletin'
    })
})

router.get('/recommend', async(ctx, next) => {
    await ctx.render('pages/recommend', {
        title: '推荐墙',
        username: 'blue',
        currentUrl: '/users/recommend'
    })
})

router.get('/administrator', async(ctx, next) => {
    await ctx.render('pages/administrator', {
        title: '管理员',
        username: 'blue',
        currentUrl: '/users/administrator'
    })
})

module.exports = router
