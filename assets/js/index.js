$(function () {
    //初始化头像和数据
    getInit();

    // 实现点击退出按钮，退出登录的功能
    $('#logout').click(function () {
        var flag = confirm('确认退出吗？')
        if (flag) {
            localStorage.removeItem('token');
            location.href = '../../home/login.html'
        }
    })

});

//渲染图片的函数
function getInit() {
    $.ajax({
        url: '/my/userinfo',
        method: 'GET',
        success: function (res) {
            if (res.status != 0) return layer.msg('获取数据失败');
            var username = res.data.nickname || res.data.username;
            var pic = res.data.user_pic
            var username1 = username[0].toUpperCase();
            // 图片
            if (pic !== null) {
                //
                $('.userinfo').show().children('img').prop('src', pic).siblings('span').html('&nbsp;欢迎&nbsp;&nbsp;' + username);
                $('.noimg').hide();
                //
                $('#self').children('div').hide();
                $('#self').children('img').show().prop('src', pic);
            } else {
                //
                $('.noimg').show().children('div').html(username1).siblings('span').html('&nbsp;欢迎&nbsp;&nbsp;' + username);
                $('.userinfo').hide();
                //
                $('#self').children('img').hide();
                $('#self').children('div').show().html(username1)
            }
        }
    })

}