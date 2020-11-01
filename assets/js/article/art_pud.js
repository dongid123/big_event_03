//入口函数
$(function () {
  // 初始化富文本编辑器
  var layer = layui.layer
  var form = layui.form
  initEditor()

  initCate()
  function initCate() {
    var id = $(this).attr('data-id')
    $.ajax({
      url: '/my/article/cates' + id,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        // 成功之后
        var Str = template('tpl-cate', res)
        $("[name=cate_id]").html(Str)
      }
    })
  }


  // 1. 初始化图片裁剪器
  var $image = $('#image')

  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
  }

  // 3. 初始化裁剪区域
  $image.cropper(options)


  // 点击封面选择文件
  $("#btnChoseImage").on('click', function () {
    $("#addimag").click()
  })

  //将文件渲染到页面上
  $("#addimag").on('change', function (e) {
    var file = e.target.files[0]
    var newImgURL = URL.createObjectURL(file)
    $image
      .cropper('destroy')      // 销毁旧的裁剪区域
      .attr('src', newImgURL)  // 重新设置图片路径
      .cropper(options)        // 重新初始化裁剪区域
    $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 400,
        height: 280
      })
      .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
        // 得到文件对象后，进行后续的操作
      })

  })



  // 设置状态
  var state = '已发布'
  $("#btnSeva2").on('click', function () {
    state = '草稿'
  })

  //添加文章
  $("#form-pud").on('submit', function (e) {
    e.preventDefault()
    // 创建FormData对象,收集数据
    var fd = new FormData(this);
    // 放入状态
    fd.append('state', state);
    // 放入图片
    $image.cropper('getCroppedCanvas', { //创建一个Canvas画布
      width: 400,
      height: 280
    })
      //将画布上的内容转化为文件对象
      .toBlob(function (blob) {
        // 得到文件对象后,进行后续的操作
        fd.append('cover_img', blob);
        //发送ajax
        publishArticle(fd)
      })
  })

  //封装一个添加文章的方法
  function publishArticle(fd) {
    $.ajax({
      method: 'POST',
      url: '/my/article/add',
      data: fd,
      contentType: false,
      processData: false,
      success: function (res) {
        // 失败判断
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        // 成功之后就跳转
        layer.msg('恭喜您,发布文章成功');
        //跳转
        setTimeout(function () {
          window.parent.document.getElementById("art-list").click()
        }, 1000)
      }
    })
  }
})