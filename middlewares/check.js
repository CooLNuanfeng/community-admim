module.exports = ctx => {
    if(!ctx.session || !ctx.session.user){
        return false;
    }
    return true;
}
