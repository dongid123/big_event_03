$(function () {
    //切换注册登录页面
    $('#reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })

    $("#login").on('click', function () {
        $(".reg-box").hide();
        $(".login-box").show()
    })


    // 判断密码是否正确
    var form = layui.form
    // console.log(form);
    form.verify({
        paw: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        eqpaw: function (value) {
            var paw = $('.reg-box [name=password]').val()
            if (value !== paw) {
                return '对不起,你再次输入的密码不正确,请再次输入密码'
            }
        }
    })
    // 提交到数据库
    var layer = layui.layer
    $("#form_ze").on('submit', function (e) {
        //阻止默认事件
        e.preventDefault()
        // 设置请求方式
        $.ajax({
            type: "POST",
            url: 'http://ajax.frontend.itheima.net/api/reguser',
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val(),
            },
            success: function (res) {
                if (res.status !== 0) { return layer.msg(res.message) }
                // 当代码执行成功之后
                // alert(res.message)
                layer.msg('注册成功,请登录')
            }
        })
    })
})