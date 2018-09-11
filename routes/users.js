const router = require('koa-router')()
const checkLogin = require('../middlewares/check.js');
const loginReg = require('../apimodels/loginReg');
const superAdmin = require('../apimodels/superAdmin');


router.prefix('/users')


//页面
router.get('/index', async(ctx, next) => {
    var {user,userid} = ctx.session;
    if(!checkLogin(ctx)){
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
    if(!checkLogin(ctx)){
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
        userInfo: null,
    })
})

router.get('/logout', async(ctx, next) => {
    ctx.session = null;
    ctx.redirect('/users/login');
})

router.get('/register', async(ctx, next) => {
    await ctx.render('pages/register', {
        title: '注册',
        userInfo: null
    })
})

router.get('/bulletin', async(ctx, next) => {
    var {user,userid} = ctx.session;
    if(!checkLogin(ctx)){
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
    if(!checkLogin(ctx)){
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
    if(!checkLogin(ctx)){
        ctx.redirect('/users/login');
        return;
    }
    var adminList = await superAdmin.getAdminList();
    var areaList = await superAdmin.getAreaList();
    await ctx.render('pages/administrator', {
        title: '管理员',
        userInfo: ctx.session,
        adminList,
        areaList,
        currentUrl: '/users/administrator'
    })
})

router.get('/area', async(ctx, next) => {
    var {user,userid} = ctx.session;
    if(!checkLogin(ctx)){
        ctx.redirect('/users/login');
        return;
    }
    await superAdmin.getAreaList().then(async result=>{
        await ctx.render('pages/area', {
            title: '区域管理',
            userInfo: ctx.session,
            currentUrl: '/users/area',
            areaList: result,
        });
    });

})



//api 接口
//登录注册
router.post('/api/login', loginReg.loginUser)
router.post('/api/register',loginReg.insertUser);
router.get('/api/addArea',superAdmin.insertArea);
router.get('/api/delArea',superAdmin.deleteArea);
router.get('/api/delAdmin',superAdmin.deleteAdmin);
router.post('/api/updateAdminarea',superAdmin.updateAdminarea);


module.exports = router
