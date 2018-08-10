var WxParse = require('../../wxParse/wxParse.js');
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '点击转到主页'
  },onLoad: function () {
    var article = '<div>我是HTML代码</div>';
    var that = this;
    WxParse.wxParse('article', 'html', article, that, 5);

    /**
      * WxParse.wxParse(bindName , type, data, target,imagePadding)
      * 1.bindName绑定的数据名(必填)
      * 2.type可以为html或者md(必填)
      * 3.data为传入的具体数据(必填)
      * 4.target为Page对象,一般为this(必填)
      * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
  */
  }
})
