;(function(){
    var $loginBtn = $('#J_doLogin');
    var $alert = $('#J_alert');
    var $alertClose = $('#J_alertClose');

    function clearAlert(){
        var timer = setTimeout(function(){
            $alert.find('strong').html('');
            $alert.hide();
            clearTimeout(timer);
        }, 3000);
    }

    $alertClose.on('click',function(){
        $alert.find('strong').html('');
        $alert.hide();
    });


    $loginBtn.on('click',function(){
        var name = $('#J_username').val();
        var password = $('#J_password').val();
        if(!name || !password){
            $alert.find('strong').html('用户名或密码不能为空');
            $alert.show();
            return;
        }
        $.ajax({
            url: '/users/api/login',
            type: 'post',
            data: {
                name: name,
                password: md5(password)
            },
            dataType: 'json'
        }).done(function(res){
            if(res.code == 200){
                location.href = '/users/index'
            }else{
                $alert.find('strong').html(res.message);
                $alert.show();
            }
        }).always(function(){
            clearAlert();
        });
    })

})();
