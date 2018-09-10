const router = require('koa-router')()

router.prefix('/users')

router.get('/index', async(ctx, next) => {
    var {user,userid} = ctx.session;
    if(!ctx.session || !ctx.session.user){
        ctx.redirect('/users/login');
        return;
    }
    await ctx.render('pages/index', {
        title: '首页',
        userInfo: ctx.session
    })
})

router.get('/detail', async(ctx, next) => {
    let query = ctx.query;
    let id = query.id;
    var {user,userid} = ctx.session;
    if(!ctx.session || !ctx.session.user){
        ctx.redirect('/users/login');
        return;
    }
    await ctx.render('pages/detail', {
        title: '发布详情',
        userInfo: ctx.session,
        type: query.type
    })
})

router.get('/login', async(ctx, next) => {
    await ctx.render('pages/login', {
        title: '登录',
        userInfo: {},
    })
})

router.get('/logout', async(ctx, next) => {
    ctx.redirect('/users/login');
})

router.get('/register', async(ctx, next) => {
    await ctx.render('pages/register', {
        title: '注册',
        userInfo: {},
    })
})

router.get('/bulletin', async(ctx, next) => {
    var {user,userid} = ctx.session;
    if(!ctx.session || !ctx.session.user){
        ctx.redirect('/users/login');
        return;
    }
    await ctx.render('pages/bulletin', {
        title: '公告',
        userInfo: ctx.session,
        currentUrl: '/users/bulletin'
    })
})

router.get('/recommend', async(ctx, next) => {
    var {user,userid} = ctx.session;
    if(!ctx.session || !ctx.session.user){
        ctx.redirect('/users/login');
        return;
    }
    await ctx.render('pages/recommend', {
        title: '推荐墙',
        userInfo: ctx.session,
        currentUrl: '/users/recommend'
    })
})

router.get('/administrator', async(ctx, next) => {
    var {user,userid} = ctx.session;
    if(!ctx.session || !ctx.session.user){
        ctx.redirect('/users/login');
        return;
    }
    await ctx.render('pages/administrator', {
        title: '管理员',
        userInfo: ctx.session,
        currentUrl: '/users/administrator'
    })
})

router.get('/area', async(ctx, next) => {
    var {user,userid} = ctx.session;
    if(!ctx.session || !ctx.session.user){
        ctx.redirect('/users/login');
        return;
    }
    await ctx.render('pages/area', {
        title: '区域管理',
        userInfo: ctx.session,
        currentUrl: '/users/area'
    })
})

module.exports = router
