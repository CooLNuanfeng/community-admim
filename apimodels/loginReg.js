const query = require('../libs/mysql.js').query;
const Md5 = require('md5');


// 查找用户名是否存在
const findDataCountByName = (name)=>{
    let _sql = `select count(*) as count from user_admin where name="${name}";`
    return query( _sql);
}

const findDataByName = (name)=>{
    let _sql = `select * from user_admin where name="${name}";`
    return query( _sql);
}


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
        await findDataByName(name).then(result=>{
            console.log(result)
            if(result.length && name == result[0].name && password == result[0].pwd){
                ctx.session = {
                    user: result[0]['name'],
                    userid: result[0]['id']
                }
                ctx.body = {
                    code: 200,
                    message: '登录成功'
                }
            }
        });

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
        await findDataCountByName(name).then(async result=>{
            if(result[0].count >= 1){
                ctx.body = {
                    code: 400,
                    message: '用户名已存在'
                }
            }else{
                let _sql = "insert into user_admin set name=?,pwd=?"
                await query( _sql,[name,password]).then(result => {
                    console.log(result);
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
