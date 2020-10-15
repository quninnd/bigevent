$(function () {
    var { form, layer, laypage } = layui;
    //参数
    var q = {
        pagenum: 1,  //	页码值
        pagesize: 2, //	每页显示多少条数据
        cate_id: '',   //	文章分类的 Id
        state: '' //文章的状态，可选值有：已发布、草稿
    }



    //文章显示的渲染
    getInitList();
    //下拉选项的渲染
    getList();

    // 自定义时间格式化函数
    template.defaults.imports.formdate = function (date) {
        var dates = new Date(date);
        var year = dates.getFullYear();
        var month = fn(dates.getMonth() + 1);
        var day = fn(dates.getDate());
        var hours = fn(dates.getHours());
        var minutes = fn(dates.getMinutes());
        var seconds = fn(dates.getSeconds());
        return year + '-' + month + '-' + day + '\t' + hours + ':' + minutes + ':' + seconds;
    }

    //定义一个补零函数
    function fn(n) {
        return n > 9 ? n : '0' + n
    }

    //点击筛选，刷新数据
    $('#form-search').submit(function (e) {
        e.preventDefault()
        var cate_id = $('[name=cate_id]').val();
        var state = $('[name=state]').val();
        q.cate_id = cate_id;
        q.state = state
        getInitList();
    })


    //动态渲染分页模板
    // jump触发有两种情况，点击分页触发，调用laypage.render（）函数触发，所以会发生死循环，可以利用jump第二个参数first来判断谁出发的，laypage.render（）触发first就是true，分页触发就是undefined
    function getPage(total) {
        laypage.render({
            elem: 'pageBox',  //分页容器
            count: total,   //总数据
            limit: q.pagesize,   //每页显示几条数据
            curr: q.pagenum,   //设置默认被选中的项
            layout: ['count', 'limit', 'refresh', 'prev', 'page', 'next', 'skip'],
            limits: [1, 2, 3, 5, 10],
            //分页发生切换，触发jump回调
            jump: function (obj, first) {
                //obj.curr能拿到切换页的数字
                q.pagenum = obj.curr;
                q.pagesize = obj.limit;
                if (!first) {
                    getInitList();
                    layer.msg('刷新成功')
                }
            }
        })
    }

    //为删除绑定事件
    $('tbody').on('click', '.btn-delete', function () {
        //拿到当前删除数据的 id
        var id = $(this).attr('data-id');
        layer.confirm('确定删除吗？', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                url: '/my/article/delete/' + id,
                method: 'get',
                success: function (res) {
                    if (status == 0) {
                        //    删除成功后调用渲染函数，重新渲染页面
                        getInitList();
                    } else {
                        layer.msg('删除操作失败')
                    }
                }
            })


            //关闭弹窗
            layer.close(index);
        });
    })


    // 渲染文章的函数
    function getInitList() {
        $.ajax({
            url: '/my/article/list',
            method: 'get',
            data: q,
            success: function (res) {
                var html = template('tpl-table', res);
                $('tbody').html(html);
                getPage(res.total)
            }
        })
    }



    //动态渲染下拉选项
    function getList() {
        $.ajax({
            url: '/my/article/cates',
            method: 'get',
            success: function (res) {
                var html = template('tpl-cate', res);
                $('select[name="cate_id"]').html(html);
                form.render('select');
            }
        });

    }
})


