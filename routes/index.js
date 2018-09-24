const router = require('koa-router')()
const wxapi = require('../api/wxapi.js');


router.get('/api/getBulletin', async (ctx, next) => {
    var {cid,type} = ctx.request.query;
    await wxapi.getArticalBycid(cid,type).then(result=>{
        ctx.body = {
            code: 200,
            data: result,
            message: 'success'
        }
    }).catch(err=>{
        ctx.body = {
            code: 500,
            err: err,
            message: 'error'
        }
    });
});


router.get('/api/getDetail',async(ctx,next)=>{
    var {id,type} = ctx.request.query;
    await wxapi.getArticalById(id,type).then(result=>{
        ctx.body = {
            code: 200,
            data: result[0],
            message: 'success'
        }
    }).catch(err=>{
        ctx.body = {
            code: 500,
            err: err,
            message: 'error'
        }
    });
});

module.exports = router
