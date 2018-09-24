const router = require('koa-router')()
const wxapi = require('../api/wxapi.js');


router.get('/api/getBulletin', async (ctx, next) => {
    var {cid,type} = ctx.request.query;
    await wxapi.getArticalBycid(cid,type).then(result=>{
        ctx.body = {
            code: 200,
            data: result,
            message: '发布成功'
        }
    });
})

module.exports = router
