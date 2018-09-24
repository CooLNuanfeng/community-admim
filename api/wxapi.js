const mysqlActions = require('../libs/mysql.js');

module.exports = {
    getArticalBycid: (cid,type) =>{
        return mysqlActions.findArticalinByCid(cid,type)
    },
    getArticalById: (id,type) =>{
        return mysqlActions.articalDetailById(id,type)
    }
}
