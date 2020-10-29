//设置开发的路径
var baseURL = 'http://ajax.frontend.itheima.net'
$.ajaxPrefilter(function (params) {
    // 拼接根路径
    params.url = baseURL + params.url
    // 对路径含有my进行判断
    if (params.url.indexOf('/my/') !== -1) {
        params.headers = {
            Authorization: localStorage.getItem("token") || ""
        }
    }
    // 拦截 complete 回调函数 responseJSON
    params.complete = function (res) {
        var obj = res.responseJSON
        // console.log(obj);
        if (obj.status === 1 && obj.message === '身份认证失败！') {
            //强制删除token函数
            localStorage.removeItem('token')
            //强制进行跳转
            location.href = '/login.html'
        }
    }
})