const router = require('koa-router')()
const checkLogin = require('../middlewares/check.js');
const loginReg = require('../api/loginReg');
const adminActions = require('../api/adminActions');


router.prefix('/users')


//页面
router.get('/index', async(ctx, next) => {
    var {user,userid} = ctx.session;
    if(!checkLogin(ctx)){
        ctx.redirect('/users/login');
        return;
    }
    var articals = await adminActions.getArticalsByName(ctx);
    var adminInfo = await adminActions.getAdminData(ctx);
    var areaList = await adminActions.getAreaList();
    await ctx.render('pages/index', {
        title: '首页',
        articals,
        areaList,
        userareaIds: adminInfo[0]['communityid'],
        userInfo: ctx.session
    })
})

router.get('/detail', async(ctx, next) => {
    let {id,type} = ctx.query;
    var {user,userid} = ctx.session;
    if(!checkLogin(ctx)){
        ctx.redirect('/users/login');
        return;
    }
    var detailInfo = await adminActions.getArticalById(id,user);
    var adminInfo = await adminActions.getAdminData(ctx);
    var areaList = await adminActions.getAreaList();
    console.log(ctx.session);
    await ctx.render('pages/detail', {
        title: '发布详情',
        userInfo: ctx.session,
        areaList,
        userareaIds: adminInfo[0]['communityid'],
        detailInfo: detailInfo[0],
        type: type
    }).catch(err=>{
        ctx.redirect('/users/error');
    });
});

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
    var adminInfo = await adminActions.getAdminData(ctx);
    var areaList = await adminActions.getAreaList();
    // console.log(adminInfo);
    if(!adminInfo[0]['communityid']){
        await ctx.render('pages/contact', {
            title: '联系管理员',
            userInfo: ctx.session,
        })
    }else{
        await ctx.render('pages/bulletin', {
            title: '公告',
            userInfo: ctx.session,
            userareaIds: adminInfo[0]['communityid'],
            areaList,
            currentUrl: '/users/bulletin'
        })
    }

})


router.get('/success', async(ctx, next) => {
    var {user,userid} = ctx.session;
    let {type} = ctx.query;
    if(!checkLogin(ctx)){
        ctx.redirect('/users/login');
        return;
    }
    await ctx.render('pages/success', {
        title: '发布成功',
        userInfo: ctx.session,
        type
    })
})

router.get('/recommend', async(ctx, next) => {
    var {user,userid} = ctx.session;
    if(!checkLogin(ctx)){
        ctx.redirect('/users/login');
        return;
    }
    var adminInfo = await adminActions.getAdminData(ctx);
    var areaList = await adminActions.getAreaList();
    if(!adminInfo[0]['communityid']){
        await ctx.render('pages/contact', {
            title: '联系管理员',
            userInfo: ctx.session,
        })
    }else{
        await ctx.render('pages/recommend', {
            title: '推荐墙',
            userInfo: ctx.session,
            userareaIds: adminInfo[0]['communityid'],
            areaList,
            currentUrl: '/users/recommend'
        })
    }
})

router.get('/administrator', async(ctx, next) => {
    var {user,userid} = ctx.session;
    if(!checkLogin(ctx)){
        ctx.redirect('/users/login');
        return;
    }
    var adminList = await adminActions.getAdminList();
    var areaList = await adminActions.getAreaList();
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
    await adminActions.getAreaList().then(async result=>{
        await ctx.render('pages/area', {
            title: '区域管理',
            userInfo: ctx.session,
            currentUrl: '/users/area',
            areaList: result,
        });
    });

})

router.get('/error', async(ctx, next) => {
    await ctx.render('pages/error', {
        title: '非法访问',
        userInfo: ctx.session,
    })
})

//api 接口
//登录注册
router.post('/api/login', loginReg.loginUser)
router.post('/api/register',loginReg.insertUser);

router.get('/api/addArea',adminActions.insertArea);
router.get('/api/delArea',adminActions.deleteArea);
router.get('/api/delAdmin',adminActions.deleteAdmin);
router.post('/api/updateAdminarea',adminActions.updateAdminarea);
router.post('/api/postArtical',adminActions.postArtical);
router.post('/api/updateArtical',adminActions.updateArtical);
router.get('/api/delArtical',adminActions.delArtical);
router.post('/api/fileupload',adminActions.uploaderImg);

module.exports = router
