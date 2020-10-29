//入口函数
$(function () {
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samepwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能一致'
            }
        },
        repwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '俩次输入的密码不一致'
            }
        }
    })

    // 重置密码
    $(".layui-form").on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                // 密码修改成功
                layui.layer.msg(res.message)
                // 密码修改成功就清空表单 
                $(".layui-form")[0].reset()
            }
        })
    })
})