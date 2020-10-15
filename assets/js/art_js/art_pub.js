$(function () {
    var { form, layer } = layui

    //初始化富文本
    initEditor();
    //渲染下拉选框
    $.ajax({
        url: "/my/article/cates",
        method: 'get',
        success: function (res) {
            var html = template('tpl-cate', res);
            $('select[name=cate_id]').html(html);
            form.render()
        }
    });


    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    //4.为上传图片按钮添加点击事件
    $('#btnChooseImage').click(function () {
        $('#coverFile').click();
        //监听文件的change事件
        $('#coverFile').change(function (e) {
            //拿到文件
            var file = e.target.files
            if (file.length == 0) layer.msg('未选择图片');
            // 将图片转化为url地址
            var imgurl = URL.createObjectURL(file[0]);
            // 更新裁剪区域
            $image
                .cropper('destroy')      // 销毁旧的裁剪区域
                .attr('src', imgurl)  // 重新设置图片路径
                .cropper(options)        // 重新初始化裁剪区域
        })
    })

    // 

    var art_state = '已发布';

    $('#btnSave2').click(function () {
        art_state = '草稿';
    })


    //监听表单的提交事件，拿到参数
    $('#form-pub').on('submit', function (e) {
        e.preventDefault();
        var form = new FormData(this);
        //存入文章发布状态
        form.append('state', art_state);
        //将裁剪区的图片输出为文件，存到FormData中
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                form.append('cover_img', blob);
                publish(form);
                // form.forEach(function (v, k) {
                //     console.log(v, k);
                // });
                // console.log(form);
            });



    });


    function publish(fd) {
        $.ajax({
            url: "/my/article/add",
            method: 'POST',
            data: fd,
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.status != 0) return layer.msg('发布失败');
                layer.msg('发布文章成功');
                location.href='article_list.html'
            }
        })
    };

})