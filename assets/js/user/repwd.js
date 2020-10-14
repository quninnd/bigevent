$(function () {
    var layer = layui.layer;
    $('#btn').click(function (e) {
        e.preventDefault();
        var old = $('input[name=old]').val();
        var newPwd = $('input[name=newPwd]').val();
        var newPwd2 = $('input[name=newPwd2]').val();
        //
        if (newPwd != newPwd2) {
            return layer.msg('新密码不一致')
        }
        //
        var text = $('.layui-form').serialize();
        if (old != '' && newPwd != '' && newPwd != '') {
            updatePwd(text);
        } else {
            layer.msg('必填项不能为空')
        }
    })
})




function updatePwd(text) {
    $.ajax({
        method: 'post',
        url: '/my/updatepwd',
        data: text,
        success(res) {
            if (res.status == 1) return layer.msg(res.message);
            if (res.status == 0) return layer.msg(res.message);

        }
    })
}