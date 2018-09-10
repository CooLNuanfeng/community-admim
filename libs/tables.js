const query = require('./mysql.js').query;

// 用户表
const user_admin = `
    CREATE TABLE IF NOT EXISTS user_admin (
      id smallint(6) NOT NULL AUTO_INCREMENT,,
      name varchar(255) CHARACTER SET utf8 NOT NULL,
      pwd varchar(255) CHARACTER SET utf8 NOT NULL,
      communityid varchar(255) CHARACTER SET utf8 DEFAULT NULL,
      community varchar(255) CHARACTER SET utf8 DEFAULT NULL,
      superadmin smallint(10) DEFAULT '0',
      PRIMARY KEY (id),
      UNIQUE KEY UN_NAME (name) USING HASH COMMENT '用户名不重复'
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
`
// 小区区域表
const area_community = `
    CREATE TABLE IF NOT EXISTS area_community (
      id int(11) NOT NULL,
      name varchar(255) CHARACTER SET utf8 NOT NULL,
      PRIMARY KEY (id),
      UNIQUE KEY UN_NAME (name) USING BTREE COMMENT '区域名称不重复'
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
`

let createTable = ( sql ) => {
    return query( sql, [] )
}

//建表
createTable(user_admin);
createTable(area_community);

process.exit();
