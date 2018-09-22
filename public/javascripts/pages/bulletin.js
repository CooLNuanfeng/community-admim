;(function(){
    var $alert = $('#J_alert');
    var $alertClose = $('#J_alertClose');
    var $title = $('#J_title');
    var $content = $('#J_content');
    var $img = $('#J_fileInput');
    var $selectArea = $('#J_communityArea');
    var $publishBtn = $('#J_publish');

    var $uploadAlert = $('#J_uploadMsg');
    var uploader,areaids = [],imgsUrl = [];


    $publishBtn.on('click',function(){
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
        uploader.upload();

    });

    $alertClose.on('click',function(){
        $alert.hide();
    });
    $uploadAlert.on('click','button',function(){
        $uploadAlert.hide();
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
            if(!checkAreaId(id)){
                $('#J_communityArea').append('<span class="label label-info" data-id="'+id+'">'+name+'<i class="glyphicon glyphicon-remove-circle"></i>');
            }
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

    function checkAreaId(id){
        var flag = false;
        $('#J_communityArea span').each(function(index,item){
            if($(item).attr('data-id') == id){
                flag = true;
                return;
            }
        });
        return flag;
    }

    function initUploader(){
        var $list = $('#J_uploadList');
        uploader = WebUploader.create({
            // auto: true,
            swf: '/javascripts/Uploader.swf',
            server: '/users/api/fileupload',
            pick: '#J_uploadBtn',
            accept: {
                title: 'Images',
                extensions: 'gif,jpg,jpeg,bmp,png',
                mimeTypes: 'image/*'
            },
            fileNumLimit: 6,
            fileSingleSizeLimit: 1024*1024*3
        });
        uploader.on('fileQueued', function(file) {
            var $li = $('<div id="' + file.id + '" class="img-thumbnail">' +
                    '<span class="del-img glyphicon glyphicon-remove J_delImg"></span>'+
                    '<img>' +
                    '<div class="img-info">等待上传</div>' +
                    '<div class="progress"><div class="progress-bar" style="width: 0%">0%</div></div>'+
                '</div>'),
            $img = $li.find('img');
            $text = $li.find('.img-info');
            $list.append($li);
            uploader.makeThumb(file, function(error, ret) {
                if ( error ) {
                    $li.text('预览错误');
                } else {
                    $img.attr('src',ret);
                }
            });
        });
        uploader.on('uploadProgress', function( file, percentage ) {
            var $li = $( '#'+file.id ),
                $process = $li.find('.progress'),
                $percent = $li.find('.progress .progress-bar');
            $process.show();
            $process.prev('.img-info').hide();
            $percent.css( 'width', percentage * 100 + '%' ).html((percentage * 100).toFixed(0) + '%');
        });
        uploader.on('uploadSuccess', function(file,response) {
            console.log(response);
            $( '#'+file.id ).find('.img-info').html('上传成功').show();
            $('#'+file.id).find('.progress').hide();
            imgsUrl.push(response.data.url);
        });

        uploader.on('error', function(err){
            if(err == 'F_EXCEED_SIZE'){
                $uploadAlert.find('p').html('文件大小必须3M以内');
                $uploadAlert.show();
                return;
            }
        });
        uploader.on('uploadFinished', function(file) {
            $.ajax({
                url: '/users/api/postArtical',
                type: 'post',
                data: {
                    title: $title.val(),
                    content: $content.val(),
                    type: 1,
                    star: '',
                    areaids: areaids.join('-'),
                    imgs: imgsUrl
                },
                dataType: 'json'
            }).done(function(res){
                if(res.code == 200){
                    location.href = '/users/success?type=1';
                }else{
                    clearAlert(res.message);
                }
            })
        });
        $list.on('click','.J_delImg',function(){
            var $li = $(this).parent();
            var id = $li.attr('id');
            uploader.removeFile(id);
            $li.remove();
        });
    }
    initUploader();


})();
