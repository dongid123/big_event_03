// 入口函数
$(function () {
    var form = layui.form
    initUserInfo()
    // 获取用户列表的信息
    function initUserInfo() {
        $.ajax({
            type: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg(res.message)
                form.val('userinfn', res.data)
            }
        })
    }

    // 重置表单
    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        initUserInfo()
    })
    // 更新用户的信息
    $(".layui-form").on('submit', function (e) {
        e.preventDefault()
        // 
        $.ajax({
            type: "POST",
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                // 
                layui.layer.msg('更新用户信息成功')
                // 调用
                window.parent.gitUserInfo()
            }
        })
    })
})