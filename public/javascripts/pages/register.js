;(function(){
    var $registerBtn = $('#J_doregister');
    var $alert = $('#J_alert');
    var $alertClose = $('#J_alertClose');


    $alertClose.on('click',function(){
        $alert.find('strong').html('');
        $alert.hide();
    });


    $registerBtn.on('click',function(){
        var username = $('#J_username').val();
        var password = $('#J_password').val();
        var repeatPwd = $('#J_repeatpwd').val();

        if(!username || !password || !repeatPwd){
            $alert.find('strong').html('用户名或密码不能为空');
            $alert.show();
            return;
        }
        if(password !== repeatPwd){
            $alert.find('strong').html('两次输入的密码不一致');
            $alert.show();
            return;
        }
        $.ajax({
            url: '/users/api/register',
            type: 'post',
            data: {
                name: username,
                password: md5(password),
                repeatpwd: md5(repeatPwd)
            },
            dataType: 'json'
        }).done(function(res){
            if(res.code == 200){
                location.href = '/users/index'
            }else{
                clearAlert(res.message);
            }
        });
    });


    function clearAlert(message){
        $alert.find('strong').html(message);
        $alert.removeClass('alert-success');
        $alert.addClass('alert-danger').show();
        var timer = setTimeout(function(){
            $alert.find('strong').html('');
            $alert.hide();
            clearTimeout(timer);
        }, 3000);
    }
})();
