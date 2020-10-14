
$.ajaxPrefilter(function (option) {
    option.url = 'http://ajax.frontend.itheima.net' + option.url;
    if (option.url.includes('/my/')) {
        option.headers = {
            Authorization: localStorage.getItem('token')
        }

    };
    // 未登录不能访问index首页
    // option.complete = function (res) {
    //     console.log(res);
    //     if (res.responseJSON && res.responseJSON.status != 0) {
    //         localStorage.removeItem('token');
    //         location.href = '../../home/login.html'
    //     }
    // }
})
