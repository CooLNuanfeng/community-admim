var mysql = require('mysql');
var config = require('../config/default.js');

const pool  = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
    port: config.database.PORT
});

const query = ( sql, values ) => {
    return new Promise(( resolve, reject ) => {
        pool.getConnection( (err, connection) => {
            if (err) {
                reject( err )
            } else {
                connection.query(sql, values, ( err, rows) => {
                    if ( err ) {
                        reject( err )
                    } else {
                        resolve( rows )
                    }
                    connection.release()
                })
            }
        })
    })
}
exports.query = query;

//微信 api
exports.findArticalinByCid = (cid,type)=>{
    let _sql = `SELECT * FROM publish_table WHERE type = ${type} AND community_ids='all' UNION SELECT * FROM publish_table WHERE type = ${type} AND community_ids LIKE '%${cid}%';`
    return query( _sql );
}
exports.articalDetailById = (id,type)=>{
   let _sql = `select * from publish_table where id="${id}" and type="${type}";`
   return query( _sql );
}








// 后台
// 查找用户名是否存在
exports.findDataCountByName = (name)=>{
    let _sql = `select count(*) as count from user_admin where name="${name}";`
    return query( _sql);
}
// 查找用户信息
exports.findDataByName = (name)=>{
    let _sql = `select * from user_admin where name="${name}";`
    return query( _sql);
}
// 插入管理员
exports.insertAdmin = (name,password)=>{
    let _sql = `insert into user_admin set name=?,pwd=?;`;
    return query(_sql,[name,password]);
}
// 查看所有管理员
exports.findAdminData = ()=>{
   let _sql = `select * from user_admin;`
   return query( _sql);
}
//删除管理员
exports.deleteAdmin = (id)=>{
    let _sql = `delete from user_admin where id="${id}";`
    return query( _sql);
}
//更新管理员权限
exports.updateAdminarea = (ids,name) => {
    let _sql = `update user_admin set communityid=?,uploadauth=1 where name=?`
    return query( _sql,[ids,name]);
}

//查找区域信息
exports.findAreaCountByName = (name)=>{
    let _sql = `select count(*) as count from area_community where name="${name}";`
    return query( _sql);
}

// 插入一个区域
exports.insertAreas = (name,letter)=>{
   let _sql = `insert into area_community set name="${name}",initials="${letter}";`
   return query( _sql,name,letter);
}
//删除一个区域
exports.deleteAreas = (id)=>{
    let _sql = `delete from area_community where id="${id}";`
    return query( _sql);
}

//查看所有的区域
exports.findAreaData = ()=>{
   let _sql = `select * from area_community;`
   return query( _sql);
}

// 发布一个帖子
exports.insertArtical = (title,content,type,star,ids,imgs,publisher)=>{
   let _sql = `insert into publish_table set title=?,content=?,type=?,star=?,community_ids=?,imgs=?,publisher=?;`
   return query( _sql,[title,content,type,star,ids,imgs,publisher]);
}
//更新帖子
exports.updateArtical = (id,title,content,star,areaids,imgs)=>{
    let _sql = `update publish_table set title=?,content=?,star=?,community_ids=?,imgs=? where id=?;`
    return query( _sql,[title,content,star,areaids,imgs,id]);
}
//查询帖子
exports.findArticalById = (id,name)=>{
   let _sql = `select * from publish_table where id="${id}" and publisher="${name}";`
   return query( _sql,id,name);
}
//删除帖子
exports.delArtical = (id)=>{
    let _sql = `delete from publish_table where id="${id}"`
    return query( _sql,id);
}
//查询用户发布
exports.findArticalByName = (name)=>{
   let _sql = `select * from publish_table where publisher="${name}";`
   return query( _sql);
}


//上传插入图片
exports.insertUploadimg = (picname,name)=>{
    let _sql = `insert into upload_pics set picname="${picname}",publisher="${name}";`
    return query( _sql);
}
