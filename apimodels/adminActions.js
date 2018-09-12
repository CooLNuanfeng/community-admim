const mysqlActions = require('../libs/mysql.js');

module.exports = {
    postBulletin: async ctx=>{
        let {title,content,areaids,imgs} = ctx.request.body;
        let publisher = ctx.session.user;
        console.log(title,content,areaids,imgs,publisher);
        await mysqlActions.insertBulletin(title,content,areaids,imgs.join(','),publisher).then(result=>{
            ctx.body = {
                code: 200,
                message: '发布成功'
            }
        }).catch(err=>{
            console.log(err);
            ctx.body = {
                code: 500,
                message: '操作异常'
            }
        });

    },
    getAdminList: async ctx=>{
        return await mysqlActions.findAdminData();
    },
    getAreaList: async ctx=>{
        return await mysqlActions.findAreaData();
    },
    getAdminData: async ctx=>{
        let name = ctx.session.user;
        return await mysqlActions.findDataByName(name);
    },
    updateAdminarea: async ctx=>{
        if(!ctx.session.permission){
            ctx.body = {
                code: 400,
                message: '你没有权限'
            }
        }else{
            let {name,ids} = ctx.request.body;
            console.log(name,ids);
            await mysqlActions.updateAdminarea(ids,name).then(result=>{
                // console.log(result);
                ctx.body = {
                    code: 200,
                    message: '操作成功'
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
    deleteAdmin: async ctx=>{
        if(!ctx.session.permission){
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
        if(!ctx.session.permission){
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
        if(!ctx.session.permission){
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
