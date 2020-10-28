$(function () {
    //调用函数
    gitUserInfo()
})

// 设置全局函数
function gitUserInfo() {
    // 发送ajax请求
    $.ajax({
        type: "GET",
        url: '/my/userinfo',
       
        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.massage)
            }
            // 获取成功渲染头部的信息
            gitAvatar(res.data)
        }
    })
}

// 渲染头部的数据
function gitAvatar(user) {
    var name = user.nickname || user.username
    $('#huanying').html('欢迎&nbsp;&nbsp;' + name)
    // 判断是否有图片
    if (user.user_pic !== null) {
        $(".layui-nav-img").show().attr('src', user.user_pic);
        $(".user_img").hide();
    } else {
        $(".layui-nav-img").hide();
        var name_img = name[0].toUpperCase()
        $(".user_img").show().html(name_img);
    }
}