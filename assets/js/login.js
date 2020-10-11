$(function () {
    var form = layui.form;
    var layer = layui.layer;

    //登录与注册页面切换
    $('#goset').on('click', function () {
        $('#zc').hide();
        $('#dl').show();

    });
    $('#back').on('click', function () {
        $('#zc').show();
        $('#dl').hide();
    });
    //表单验证
    form.verify({
        'pwd': [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        'repwd': function (value, item) {
            if ($('input[name=repassword]').val() != value) {
                layer.msg('两次密码不一致');
            }
        }
    });

    //发起注册请求
    $('#btn2').on('click', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: $('#dlform').serialize(),
            success: function (res) {
                if (res.status != 0) return layer.msg(res.message)
                $('#back').click();
                layer.msg('注册成功，请登录')
            }
        })
    });

    //发起登录请求
    $('#btn1').on('click', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $('#zcform').serialize(),
            success: function (res) {
                console.log(res);
                if (res.status == 1) return layer.msg('登录失败');
                localStorage.setItem('token', res.token);
                location.href = '../../home/index.html'
            }
        })
    })

})