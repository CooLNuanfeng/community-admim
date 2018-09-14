;(function(){
    var $addBtn = $('#J_doAdd');
    var $delBtn = $('#J_doDelete');
    var $nameInput = $('#J_areaName');
    var $letterInput = $('#J_areaLetter');
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
                clearAlert('删除成功');
                $deleteDom.remove();
            }else{
                clearAlert(res.message);
            }
        });
    });


    $addBtn.on('click',function(){
        var name = $nameInput.val();
        var letter = $letterInput.val().toUpperCase().substring(0,1);
        $.ajax({
            url: '/users/api/addArea',
            type: 'get',
            data: {
                name: name,
                letter: letter
            },
            dataType: 'json'
        }).done(function(res){
            if(res.code == 200){
                var data = res.data;
                clearAlert('添加成功',true);
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

    function clearAlert(message,type){
        $alert.find('strong').html(message);
        if(type){
            $alert.addClass('alert-success');
            $alert.removeClass('alert-danger').show();
        }else{
            $alert.removeClass('alert-success');
            $alert.addClass('alert-danger').show();
        }
        var timer = setTimeout(function(){
            $alert.find('strong').html('');
            $alert.hide();
            clearTimeout(timer);
        }, 3000);
    }

})();
