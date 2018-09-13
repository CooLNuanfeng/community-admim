;(function(){
    var $addBtn = $('#J_doAdd');
    var $delBtn = $('#J_doDelete');
    var $nameInput = $('#J_areaName');
    var $alert = $('#J_alert');
    var $alertClose = $('#J_alertClose');
    var $tbody = $('#J_tbody');
    var deleteId = '';
    var $deleteDom = null;

    function appendHtml(id,name){
        var html = '<tr><td>'+id+'</td><td><strong>'+name+'</strong></td><td><button class="btn btn-danger" data-id="'+id+'" data-toggle="modal" data-target="#promptModal">删除</button></td></tr>';
        $tbody.append(html);
    }

    $alertClose.on('click',function(){
        $alert.hide();
    });

    $tbody.on('click','.btn',function(){
        deleteId = $(this).data('id');
        $deleteDom = $(this).parents('tr');
    });

    $delBtn.on('click',function(){
        $.ajax({
            url: '/users/api/delArea',
            type: 'get',
            data: {
                id: deleteId
            },
            dataType: 'json'
        }).done(function(res){
            if(res.code == 200){
                $alert.find('strong').html('删除成功');
                $alert.removeClass('alert-danger');
                $alert.addClass('alert-success').show();
                $deleteDom.remove();
            }else{
                clearAlert(res.message);
            }
        });
    });


    $addBtn.on('click',function(){
        var name = $nameInput.val();
        $.ajax({
            url: '/users/api/addArea',
            type: 'get',
            data: {
                name: name
            },
            dataType: 'json'
        }).done(function(res){
            if(res.code == 200){
                var data = res.data;
                $alert.find('strong').html('添加成功');
                $alert.removeClass('alert-danger');
                $alert.addClass('alert-success').show();
                appendHtml(data.community_id,data.community_name);
                setTimeout(function(){
                    $alert.find('strong').html('');
                    $alert.hide();
                }, 3000);
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
