const mysqlActions = require('./mysql.js');

// 用户表
const user_admin = `
    CREATE TABLE IF NOT EXISTS user_admin (
    id smallint(6) NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    pwd varchar(255) NOT NULL,
    communityid varchar(255) DEFAULT NULL,
    community varchar(255) DEFAULT NULL,
    superadmin smallint(10) DEFAULT '0',
    PRIMARY KEY (id),
    UNIQUE KEY UN_NAME (name) USING HASH COMMENT '用户名不重复'
    ) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;
`
// 小区区域表
const area_community = `
    CREATE TABLE IF NOT EXISTS area_community (
      id int(11) NOT NULL AUTO_INCREMENT,
      name varchar(255) NOT NULL,
      initials varchar(2) DEFAULT NULL COMMENT '首字母',
      PRIMARY KEY (id),
      UNIQUE KEY UN_NAME (name) USING BTREE COMMENT '区域名称不重复'
    ) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
`

// 公告表
const bulletin_admin = `
    CREATE TABLE IF NOT EXISTS bulletin_admin (
    id int(255) NOT NULL AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    content varchar(255) NOT NULL,
    community_ids varchar(255) NOT NULL,
    imgs varchar(255) DEFAULT NULL,
    publisher varchar(50) NOT NULL,
    time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
`

const createTable = ( sql ) => {
    return mysqlActions.query( sql, [] )
}

//建表
Promise.all([
    createTable(user_admin),
    createTable(area_community),
    createTable(bulletin_admin)
]).then(()=>{
    console.log('create tables success');
    process.exit();
});
