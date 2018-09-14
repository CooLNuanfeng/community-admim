;(function(){
    var $alert = $('#J_alert');
    var $alertClose = $('#J_alertClose');
    var $title = $('#J_title');
    var $content = $('#J_content');
    var $img = $('#J_fileInput');
    var $selectStar = $('#J_selectStar');
    var $selectArea = $('#J_communityArea');
    var $publishBtn = $('#J_publish');
    var $deleteBtn = $('#J_delete');
    var type = $('#J_type').val();

    //删除
    $deleteBtn.on('click',function(){
        var id = $(this).data('id');
        $.ajax({
            url: '/users/api/delArtical?id='+id,
            type: 'get',
            dataType: 'json'
        }).done(function(res){
            if(res.code == 200){
                location.href = '/users/success?type=3';
            }else{
                clearAlert(res.message);
            }
        })
    });

    //修改
    $publishBtn.on('click',function(){
        var areaids = [],id = $(this).data('id');
        $selectArea.find('span').each(function(index,item){
            var id = $(item).attr('data-id');
            if(id == 'all'){
                areaids.push('all');
            }else{
                areaids.push(id);
            }
        });
        if(!areaids.length){
            clearAlert('区域参数缺失');
            return;
        }
        $.ajax({
            url: '/users/api/updateArtical',
            type: 'post',
            data: {
                id: id,
                title: $title.val(),
                content: $content.val(),
                type: type,
                star: $selectStar.val() || 0,
                areaids: areaids.join('-'),
                imgs: ['http://dummyimage.com/750x100']
            },
            dataType: 'json'
        }).done(function(res){
            if(res.code == 200){
                location.href = '/users/success?type=2';
            }else{
                clearAlert(res.message);
            }
        })
    });

    $alertClose.on('click',function(){
        $alert.hide();
    });


    $('#J_uploadBtn').on('click',function(){
        $('#J_fileInput').trigger('click');
    });

    $('#J_addComunity').on('click',function(){
        if(!$(this).data('open')){
            $(this).html('收起');
            $(this).data('open',true);
        }else{
            $(this).html('选择区域');
            $(this).data('open',false);
        }
        $('#J_communityList').slideToggle();
    });

    $('#J_communityArea').on('click','span.label-info',function(){
        $(this).remove();
    });
    $('.J_item_area').on('click',function(){
        var name = $(this).html();
        var id = $(this).data('id');
        if(name == '全部'){
            $('#J_communityArea').html('');
            $('#J_communityArea').append('<span class="J_allSpan label label-info" data-id="all">全部<i class="glyphicon glyphicon-remove-circle"></i>');
        }else{
            if($('.J_allSpan').length){
                $('.J_allSpan').remove();
            }
            $('#J_communityArea').append('<span class="label label-info" data-id="'+id+'">'+name+'<i class="glyphicon glyphicon-remove-circle"></i>');
        }
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
