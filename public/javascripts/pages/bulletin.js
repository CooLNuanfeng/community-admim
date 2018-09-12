;(function(){
    var $alert = $('#J_alert');
    var $alertClose = $('#J_alertClose');
    var $title = $('#J_title');
    var $content = $('#J_content');
    var $img = $('#J_fileInput');
    var $selectArea = $('#J_communityArea');
    var $publishBtn = $('#J_publish');




    $publishBtn.on('click',function(){
        var areaids = [];
        $selectArea.find('span').each(function(index,item){
            var id = $(item).attr('data-id');
            if(id == 'all'){
                areaids.push('all');
            }else{
                areaids.push(id);
            }
        });
    
        $.ajax({
            url: '/users/api/postBulletin',
            type: 'post',
            data: {
                title: $title.val(),
                content: $content.val(),
                areaids: areaids.join('-'),
                imgs: ['http://dummyimage.com/750x100','http://dummyimage.com/750x500']
            },
            dataType: 'json'
        }).done(function(res){
            if(res.code == 200){
                location.href = '/users/success';
            }else{
                $alert.find('strong').html(res.message);
                $alert.removeClass('alert-success');
                $alert.addClass('alert-danger').show();
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

    $('#J_communityArea').on('click','span',function(){
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

})();
