$(function () {
    var layer = layui.layer;
    getMessage();
    //重置
    $('#btnReset').click(function () {
        getMessage();
    })

    //确认修改按钮
    $('#btnSubmit').click(function (e) {
        e.preventDefault();
        var text = $('.layui-form').serialize();
        updateUser(text);
    })

})

// 初始化用户信息
function getMessage() {
    $.ajax({
        url: '/my/userinfo',
        method: 'get',
        success: function (res) {
            if (res.status == 0) {
                $('input[name="nickname"]').val(res.data.nickname);
                $('input[name="username"]').val(res.data.username);
                $('input[name="email"]').val(res.data.email);
                $('input[name="id"]').val(res.data.id);
            };
        }
    });
}


// 更新用户函数
function updateUser(text) {
    $.ajax({
        url: '/my/userinfo',
        method: 'post',
        data: text,
        success: function (res) {
            if (res.status != 0) return layer.msg('更新数据失败')
            getMessage();
            window.parent.getInit();
            layer.msg('修改信息成功');
        }
    })
}
