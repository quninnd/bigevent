var index = null;
var index1 = null;
$(function () {
    let layer = layui.layer;
    // 渲染页面数据
    getType();

    //弹出层
    $('#btnAdd').click(function (e) {
        // console.dir(e.target.id == btnAdd);
        if (e.target.id == 'btnAdd') {
            var html = template('bounce', {})
            index = layer.open({
                title: '添加文章分类',
                content: html,
                type: '0',
                area: ['500px', '250px']
            });
        }

    });
    //提交新增
    var b = $('#form-b')
    $('body').on('submit', b, function (e) {
        if (e.target.action == 'http://127.0.0.1:5500/home/article/art_type.html') {
            var text = $('#form-b').serialize();
            console.dir(e.target.action);
            fn(text);
        }


    });


    // 点击修改按钮弹出弹框
    var c = $('#btnE');
    var that = null;
    $('body').on('click', c, function (e) {
        that = e.target;
        if (that.localName == 'button' && that.innerHTML == "编辑") {
            //将原来的数据渲染到弹出框
            var txt = $(that).parent().siblings();
            var id = $(that).attr('num');
            var obj = {
                txt1: txt[0].innerHTML,
                txt2: txt[1].innerHTML
            }
            var html = template('edit', obj);
            index1 = layer.open({
                title: '修改文章分类',
                content: html,
                type: '0',
                area: ['500px', '250px']
            });
            //莫名其妙能赋值成功
            // $('#btnEdit').on('click', function () {
            //     layer.close(index1);
            // })
        }
    });
})

//渲染页面的函数
function getType() {
    $.ajax({
        method: "get",
        url: "/my/article/cates",
        success(res) {
            if (res.status != 0) return layer.msg('加载失败，请重试');
            var html = template('art_type', res);
            $('#tbd').html(html);
        }
    })
}

//添加文章分类的函数
function fn(text) {
    $.ajax({
        method: 'POST',
        url: '/my/article/addcates',
        data: text,
        success: function (res) {
            if (res.status != 0) return layer.msg('添加文章失败');
            layer.close(index);
            getType();
            console.log('调用了fn函数');

        }
    })
}