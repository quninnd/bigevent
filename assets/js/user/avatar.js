$(function () {
    var layer = layui.layer

    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options);


    //上传按钮的事件
    $('#btnChooseImage').click(function () {
        $('#file').click();
        $('#file').on('change', function (e) {
            var file = e.target.files
            if (file.length == 0) return layer.msg('请选择图片');
            //将拿到的图片转化为一个url地址
            var newImgURL = URL.createObjectURL(file[0])
            //重新初始化裁剪区域
            $image
                .cropper('destroy')      // 销毁旧的裁剪区域
                .attr('src', newImgURL)  // 重新设置图片路径
                .cropper(options);        // 重新初始化裁剪区域
        });

    });


    //为确定按钮绑定点击事件
    $('#btnUpload').on('click', function (e) {
        var imgURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png');
        $.ajax({
            url: '/my/update/avatar',
            method: 'POST',
            data: {
                avatar: imgURL
            },
            success: function (res) {
                if (res.status == '0') {
                    // 调用index页面初始化的函数
                    layer.msg('更新成功');
                    window.parent.getInit();
                }
            }
        })
    });


})




