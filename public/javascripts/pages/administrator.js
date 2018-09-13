;(function(){
    var $delBtn = $('#J_doDelete');
    var $alert = $('#J_alert');
    var $alertClose = $('#J_alertClose');
    var $tbody = $('#J_tbody');
    var deleteId = '';
    var $currentDom = null;
    var curname = '';
    var $curArea = $('#J_curArea');
    var $allArea = $('#J_allArea');
    var curAreaArrJson = [];


    $('.J_modifyBtn').on('click',function(){
        curAreaArrJson.length = 0;
        $curArea.html('');
        var $span = $(this).parents('tr').find('.J_curWarp span');
        if($span.length){
            $.each($span,function(index,item){
                var id = $(item).data('id');
                var name = $(item).html();
                var html = '<span class="label label-success" data-id="'+id+'"> '+name+'<i class="glyphicon glyphicon-remove-circle"></i>';
                curAreaArrJson.push({
                    id: id,
                    name: name
                });
                $curArea.append(html);
            });
        }
    });


    $curArea.on('click','span',function(){
        var id = $(this).data('id');
        var status = checkArrId(id);
        if(status){
            curAreaArrJson.splice(status.index,1);
        }
        $(this).remove();
    });
    $allArea.on('click','span',function(){
        var name = $(this).html();
        var id = $(this).data('id');
        if(!checkArrId(id)){
            var html = '<span class="label label-success" data-id="'+id+'"> '+name+'<i class="glyphicon glyphicon-remove-circle"></i>';
            $curArea.append(html);
            curAreaArrJson.push({
                id: id,
                name: name
            });
        }
    });


    $tbody.on('click','.btn',function(){
        deleteId = $(this).data('id');
        $currentDom = $(this).parents('tr');
        curname = $(this).data('name');
    });

    $('#J_doModify').on('click',function(){
        // console.log(curAreaArrJson);
        var ids = makeParams(curAreaArrJson);
        $.ajax({
            url: '/users/api/updateAdminarea',
            type: 'post',
            data: {
                ids: ids,
                name: curname
            },
            dataType: 'json'
        }).done(function(res){
            if(res.code == 200){
                $alert.find('strong').html('操作成功');
                $alert.removeClass('alert-danger');
                $alert.addClass('alert-success').show();
                var html = renderAreaHtml(curAreaArrJson);
                $currentDom.find('.J_curWarp').html(html);
            }else{
                clearAlert(res.message);
            }
        });
    });


    //删除管理员
    $delBtn.on('click',function(){
        $.ajax({
            url: '/users/api/delAdmin',
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
                $currentDom.remove();
            }else{
                clearAlert(res.message)
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

    function checkArrId(id){
        var flag = false;
        var pos;
        curAreaArrJson.forEach(function(item,index){
            if(item.id == id){
                flag = true;
                pos = index;
            }
            return;
        });
        if(flag){
            return {
                flag: true,
                index: pos
            }
        }else{
            return false;
        }

    }

    function renderAreaHtml(arr){
        var html = '';
        arr.forEach(function(item,index){
            html += '<span class="label label-success" data-id="'+item.id+'">'+item.name+'</span>'
        });
        return html;
    }

    function makeParams(arr){
        var str = '';
        arr.forEach(function(item,index){
            if(!index){
                str += item.id;
            }else{
                str += '-' + item.id;
            }
        });
        return str;
    }

})();
