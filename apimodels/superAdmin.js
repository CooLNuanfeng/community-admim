const mysqlActions = require('../libs/mysql.js');

module.exports = {
    getAdminList: async ctx=>{
        return await mysqlActions.findAdminData();
    },
    getAreaList: async ctx=>{
        return await mysqlActions.findAreaData();
    },
    updateAdminarea: async ctx=>{
        if(ctx.session.userid!==1 && ctx.session.user!= 'blue'){
            ctx.body = {
                code: 400,
                message: '你没有权限'
            }
        }else{
            let {name,ids} = ctx.request.body;
            await mysqlActions.updateAdminarea(ids,name).then(result=>{
                ctx.body = {
                    code: 200,
                    message: '操作成功'
                }
            }).catch(err=>{
                ctx.body = {
                    code: 500,
                    message: '服务异常'
                }
            });
        }
    },
    deleteAdmin: async ctx=>{
        if(ctx.session.userid!==1 && ctx.session.user!= 'blue'){
            ctx.body = {
                code: 400,
                message: '你没有权限'
            }
        }else{
            let {id} = ctx.request.query;
            await mysqlActions.deleteAdmin(id).then(result=>{
                ctx.body = {
                    code: 200,
                    message: '删除成功'
                }
            }).catch(err=>{
                ctx.body = {
                    code: 500,
                    message: '服务异常'
                }
            });
        }
    },
    insertArea: async ctx=>{
        if(ctx.session.userid!==1 && ctx.session.user!= 'blue'){
            ctx.body = {
                code: 400,
                message: '你没有权限'
            }
        }else{
            let {name} = ctx.request.query;
            await mysqlActions.findAreaCountByName(name).then(async result=>{
                if(result[0].count >= 1){
                    ctx.body = {
                        code: 400,
                        message: '区域名已存在'
                    }
                }else{
                    await mysqlActions.insertAreas(name).then(result=>{
                        ctx.body = {
                            code: 200,
                            message: '插入成功',
                            data: {
                                community_name: name,
                                community_id: result['insertId']
                            }
                        }
                    })
                }
            }).catch(err=>{
                console.log(err);
                ctx.body = {
                    code: 500,
                    message: '服务异常'
                }
            });

        }
    },
    deleteArea: async ctx => {
        if(ctx.session.userid!==1 && ctx.session.user!= 'blue'){
            ctx.body = {
                code: 400,
                message: '你没有权限'
            }
        }else{
            let {id} = ctx.request.query;
            await mysqlActions.deleteAreas(id).then(result=>{
                console.log(result);
                ctx.body = {
                    code: 200,
                    message: '删除成功'
                }
            }).catch(err=>{
                console.log(err);
                ctx.body = {
                    code: 500,
                    message: '服务异常'
                }
            });
        }
    },

}
