;(function(){
    var $loginBtn = $('#J_doLogin');
    var $alert = $('#J_alert');
    var $alertClose = $alert.find('button');

    $alertClose.on('click',function(){
        $alert.find('strong').html('');
        $alert.hide();
    });


    $loginBtn.on('click',function(){
        var name = $('#J_username').val();
        var password = $('#J_password').val();
        var remember = $('#J_remember').prop('checked');
        if(!name || !password){
            $alert.find('strong').html('用户名或密码不能为空');
            $alert.show();
            return;
        }
        $.ajax({
            url: '/api/login',
            type: 'post',
            data: {
                name: name,
                password: md5(password),
                remember: remember
            },
            dataType: 'json'
        }).done(function(res){

        });
    })

})();
