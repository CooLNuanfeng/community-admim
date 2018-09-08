;(function(){

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
        $('#J_communityArea').append('<span class="label label-info">'+name+'<i class="glyphicon glyphicon-remove-circle"></i>');
    });

})();
