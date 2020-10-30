$(function () {
    var layer = layui.layer
    var form = layui.form
    gitArtCate()
    function gitArtCate() {
        $.ajax({
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res);
                var obj = template('btn-art-add', res)
                $('tbody').html(obj)
            }
        })

    }
    //点击添加弹出层
    var indexAdd = null
    $("#btn-add").on('click', function () {
        indexAdd = layer.open({
            type: 1,
            title: '添加文章分类',
            content: '传入任意的文本或html',//这里content是一个普通的String
            area: ['500px', '300px'],
            content: $("#btn-art-Add").html()
        });
    })
    // 渲染到弹出层上面
    $("body").on('submit', '#form-add', function (e) {
        e.preventDefault(
            $.ajax({
                type: "POST",
                url: "/my/article/addcates",
                data: $(this).serialize(),
                success: function (res) {
                    if (res.status !== 0) {
                        // console.log(res);
                        return layer.msg(res.message)
                    }
                    //添加成功更新页面
                    gitArtCate()
                    layer.msg(res.message)
                    layer.close(indexAdd)
                }
            })
        )
    })

    // 绑定删除事件
    $('tbody').on('click', '.btn-delete', function () {
        var Id = $(this).attr('data-id')
        layer.confirm('请问您是否要删除', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                url: '/my/article/deletecate/' + Id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    // 删除成功后重新渲染页面
                    gitArtCate()
                    // 删除成功的提示
                    layer.msg(res.message)
                    // 删除成功
                    layer.close(index);
                }
            })
        });
    })

    // 绑定编辑事件
    var indexEdit = null
    $("tbody").on('click', ".btn-edit", function () {
        // console.log(123);
        indexEdit = layer.open({
            type: 1,
            title: '添加文章分类',
            content: '传入任意的文本或html',//这里content是一个普通的String
            area: ['500px', '300px'],
            content: $("#btn-art-edit").html()
        });
        var Id = $(this).attr('data-Id')
        $.ajax({
            url: "/my/article/cates/" + Id,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 
                form.val("form-edit", res.data)
                //获取数据成功
                // layer.msg(res.message)
            }
        })
    })

    //修改分类的表单名字
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 成功之后重新渲染页面
                gitArtCate()
                //当代吗执行完毕之后
                layer.msg(res.message)
                // 自动关闭弹出层
                layer.close(indexEdit)
            }
        })
    })
})