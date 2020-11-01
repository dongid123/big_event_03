$(function () {
    // 设置时间拦截
    template.defaults.imports.dateFormat = function (dtstr) {
        var dt = new Date(dtstr)
        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + " " + hh + ':' + mm + ':' + ss
    }
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }

    // 定义提交数据
    var q = {
        pagenum: 1,    //页码值
        pagesize: 2,	//每页显示多少条数据
        cate_id: '',    //ng	文章分类的 Id
        state: '',    //ng	文章的状态，可选值有：已发布、草稿  
    }

    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage;
    //2疯转函数渲染数据
    initTabal()
    function initTabal() {
        $.ajax({
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 代码执行成功之后
                var htmlSrt = template('tpl-table', res)
                $('tbody').html(htmlSrt)
                renderPage(res.total)
            }

        })
    }
    // 3 分类
    initCate()
    function initCate() {
        $.ajax({
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 代码执行成功之后
                var htmlStr = template('lpl-cate', res)
                $("[name=cate_id]").html(htmlStr)
                form.render()
            }
        })
    }
    // 筛选渲染数据
    $('#secher-form').on('submit', function (e) {
        e.preventDefault()
        q.state = $("[name=state]").val()
        q.cate_id = $("[name=cate_id]").val()
        // 获取到最新的数据之后再重新渲染页面
        initTabal()
    })

    //分页
    function renderPage(total) {
        laypage.render({
            elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号
            count: total,//数据总数，从服务端得到
            limit: q.pagesize,//显示的条数
            curr: q.pagenum, //默认的页数
            layout: ['count', 'limit', 'prev', 'page', 'skip', 'next'],
            jump: function (obj, first) {
                //obj包含了当前分页的所有参数，比如：
                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                // console.log(obj.limit); //得到每页显示的条数
                q.pagenum = obj.curr;
                q.pagesize = obj.limit;
                //首次不执行
                if (!first) {
                    initTabal()
                    //do something
                }
            }

        });
    }

    // 点击删除
    $('body').on('click', '.btn-delete', function () {
        var Id = $(this).attr('data-id')
        layer.confirm('是否要删除此文章?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                url: '/my/article/delete/' + Id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('对不起,文章删除失败')
                    }
                    layer.msg('文章删除成功')
                    if ($('.btn-delete').length === 1 && q.pagenum > 1) q.pagenum--
                    initTabal()
                }
            })
            layer.close(index);
        });

    })
})