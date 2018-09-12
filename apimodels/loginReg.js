const mysqlActions = require('../libs/mysql.js');
const Md5 = require('md5');

module.exports = {
    //用户登录
    loginUser: async ctx => {
        let {name,password,remember} = ctx.request.body;
        if(!name || !password){
            ctx.body = {
                code: 400,
                message: '用户名或密码不能为空'
            }
        }
        await mysqlActions.findDataByName(name).then(result=>{
            if(!result.length){
                ctx.body = {
                    code: 400,
                    message: '用户名不存在'
                }
                return;
            }
            if(result.length && name == result[0].name && password == result[0].pwd){
                ctx.session = {
                    user: result[0]['name'],
                    userid: result[0]['id'],
                    permission: result[0]['superadmin']
                }
                ctx.body = {
                    code: 200,
                    message: '登录成功'
                }
            }else if(password != result[0].pwd){
                ctx.body = {
                    code: 400,
                    message: '用户名和密码不匹配'
                }
            }else{
                ctx.body = {
                    code: 400,
                    message: '未知错误，请重试'
                }
            }
        }).catch(err=>{
            console.log(err);
            ctx.body = {
                code: 500,
                message: '服务异常'
            }
        });;

    },
    // 注册用户
    insertUser: async ctx => {
        let {name,password,repeatpwd} = ctx.request.body;
        if(!name || !password || !repeatpwd){
            ctx.body = {
                code: 400,
                message: '用户名或密码不能为空'
            }
        }
        if(password !== repeatpwd){
            ctx.body = {
                code: 400,
                message: '两次密码输入不一致'
            }
        }
        await mysqlActions.findDataCountByName(name).then(async result=>{
            if(result[0].count >= 1){
                ctx.body = {
                    code: 400,
                    message: '用户名已存在'
                }
            }else{
                await mysqlActions.insertAdmin(name,password).then(result => {
                    // console.log(result);
                    ctx.session = {
                        user: name,
                        userid: result['insertId'],
                        permission: 0
                    }
                    ctx.body = {
                        code: 200,
                        message: '注册成功'
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
}
