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
    var b = $('#btnEdit')
    $('body').on('click', b, function (e) {
        e.preventDefault()
        if (e.target.innerHTML == '确认添加') {
            var text = $('#form-b').serialize();
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
            var id = '&Id=' + $(that).attr('num');
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
            //修改类型并更新数据
            $('#btnEdit').on('click', function () {
                if (this.innerHTML = '确认修改') {
                    // 调用编辑更新文类别打的函数
                    var text = $(this).parents('#form-b').serialize() + id;
                    article_Edit(text);
                }
                layer.close(index1);
            })
        }
    });
})


//点击删除就删除对应的数据
var btnE = $('#btnE')
$('body').on('click', btnE, function (e) {
    var Id = e.target.getAttribute('num');
    if (e.target.innerHTML == '删除') {
        remove(Id);
        layer.msg('删除成功')
    }
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
            getType();
            layer.close(index);
        }
    })
}

//编辑后发送ajax到后台的函数
function article_Edit(text) {
    $.ajax({
        url: '/my/article/updatecate',
        method: 'POST',
        data: text,
        success: function (res) {
            if (res.status == 0) {
                getType();
            }
        }
    })
};


//删除数据的ajax函数
function remove(id) {
    $.ajax({
        method: 'get',
        url: '/my/article/deletecate/' + id,
        success: function (res) {
            if (res.status == 1) return layer.msg(res.message);
            if (res.status == 0) {
                getType();
            }
        }
    })
}