const mysqlActions = require('../libs/mysql.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    getArticalsByName: async ctx =>{
        var name = ctx.session.user;
        return await mysqlActions.findArticalByName(name);
    },
    getArticalById: async (id,name)=>{
        return await mysqlActions.findArticalById(id,name);
    },
    postArtical: async ctx=>{
        let {title,content,type,star,areaids,imgs} = ctx.request.body;
        let publisher = ctx.session.user;
        if(!imgs) imgs = [];
        await mysqlActions.insertArtical(title,content,type,star,areaids,imgs.join(','),publisher).then(result=>{
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
    updateArtical: async ctx=>{
        let {id,title,content,star,areaids,imgs} = ctx.request.body;
        // console.log(areaids);
        if(!imgs) imgs = [];
        await mysqlActions.updateArtical(id,title,content,star,areaids,imgs.join(',')).then(result=>{
            ctx.body = {
                code: 200,
                message: '修改成功'
            }
        }).catch(err=>{
            console.log(err);
            ctx.body = {
                code: 500,
                message: '操作异常'
            }
        });
    },
    delArtical: async ctx=>{
        let {id} = ctx.request.query
        await mysqlActions.delArtical(id).then(result=>{
            ctx.body = {
                code: 200,
                message: '修改成功'
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
            // console.log(name,ids);
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
            let {name,letter} = ctx.request.query;
            await mysqlActions.findAreaCountByName(name).then(async result=>{
                if(result[0].count >= 1){
                    ctx.body = {
                        code: 400,
                        message: '区域名已存在'
                    }
                }else{
                    await mysqlActions.insertAreas(name,letter).then(result=>{
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
                // console.log(result);
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
    uploaderImg: async ctx=>{
        //修改表设置上传权限
        if(!ctx.session.uploadAuth){
            ctx.body = {
                code: 400,
                message: '你没有权限'
            }
        }else{
            let name = ctx.session.user;
            let file = ctx.request.files.file;
        	let ext = file.name.split('.').pop();
            let filename = Math.random().toString().substring(2);
            let fileUrl = `/temp/${filename}.${ext}`;
            let reader = fs.createReadStream(file.path);
        	let upStream = fs.createWriteStream(path.join(__dirname,`../public/temp/${filename}.${ext}`));
        	reader.pipe(upStream);

            await mysqlActions.insertUploadimg(filename,name).then(result=>{
                ctx.body = {
                    code: 200,
                    message: '上传成功',
                    data: {
                        name: filename,
                        url: fileUrl,
                        id: result['insertId']
                    }
                }
            }).catch(err=>{
                console.log(err);
                ctx.body = {
                    code: 500,
                    message: '服务异常'
                }
            });
        }
    }
}
