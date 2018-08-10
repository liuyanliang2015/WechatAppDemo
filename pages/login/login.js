// pages/login/login.js
//需要使用这些模块的文件中，使用require(path)将公共代码引入
const md5Util = require('../../utils/md5.js')
const Api = require('../../utils/api.js')
const jsonUtil = require('../../utils/json.js')
const HttpUtil = require('../../utils/Http.js')
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    "logo_img":'../../image/logo.png',
    "logo_img_style":'aspectFit',
    "input_phone": '../../image/login/input_phone.png',
    "input_pwd": '../../image/login/input_pwd.png',
    "close_img":"../../image/login/close.png",
    "account_pwd":"",
    "account_name":"",
    "isRememberPwd":false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () { 
    this.setData({
      //微信原生API，例如获取微信用户信息，本地存储，支付功能
      account_name : wx.getStorageSync("account_name"),
      isRememberPwd : wx.getStorageSync("isRememberPwd"),
      account_pwd: wx.getStorageSync("account_pwd")
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  login:function(e){
    console.log(e);
    var that = this
    var account_name = e.detail.value.account_name;
    var account_pwd = e.detail.value.account_pwd;
    console.log("account:" + account_name + ",password:" + account_pwd);

    //setData 函数用于将数据从逻辑层发送到视图层，同时改变对应的 this.data 的值
    this.setData({
      account_name: account_name ,
      account_pwd: account_pwd
    });

    if (account_name.length == 0){
      wx.showModal({
        title: '提示',
        content: "请输入账号",
        showCancel: false,
        success: function (res) {
        }
      });
      return;
    }

     if (account_pwd.length == 0){
      wx.showModal({
        title: '提示',
        content: "请输入密码",
        showCancel: false,
        success: function (res) {
        }
      });
      return;
    }
    //const：用于声明常量
    //var：声明全局变量，换句话理解就是，声明在for循环中的变量，跳出for循环同样可以使用。
    //let：声明块级变量，即局部变量。 在上面的例子中，跳出for循环，再使用sum变量就会报错


    let map = new Map();  
    map.set('accountName', account_name);
    map.set('password', md5Util.hexMD5(account_pwd));
    let jsonData = jsonUtil.mapToJson(map);  
    var url = Api.loginUrl;
    
    HttpUtil._post_from(url,jsonData,
      function(res){
        if (res.data.code == 0)
        {
          wx.showToast({
            title: '登录成功',
            icon: 'succes',
            duration: 1000,
            mask: true
          });

          that.setData({
            UserInfo: res.data.userInfo
          })
          cacheUser(that);
          //navigateTo,redirectTo只能打开非 tabBar 页面
          //switchTab 只能打开 tabBar 页面
          //reLaunch 可以打开任意页面。
          wx.reLaunch({ 
            url: "../index/index"
          })
        }
        else{
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false,
            success: function (res) {
            }
          });
        }
      },
      function(res)
      {
        wx.showModal({
          title: '提示',
          content: "未连接网络",
          showCancel: false,
          success: function (res) {
          }
        });
      }
    )
    
    
  },
  clear_input_content:function(event)
  { 
    var that = this;
    if (event.currentTarget.id =="account_name_img") { 
      this.setData({
        account_name:""
      })
      return;
    }
    if (event.currentTarget.id == "account_pwd_img") { 
      this.setData({
        account_pwd: ""
      })
      return;
    }
  },
  check_pwd:function(e){ 
    this.setData({
      isRememberPwd: !this.data.isRememberPwd
    }) 
  }
})


var cacheUser = function (that) {
  //console.log(that);
  wx.setStorage({
    key: 'isRememberPwd',
    data: that.data.isRememberPwd,
    success: function (res) {
      console.log('cache isRememberPwd ok ')
    }
  })
  
  wx.setStorage({
    key: 'UserInfo',
    data: that.data.UserInfo,
    success: function (res) {
      console.log('cache userInfo ok ')
    }
  })


  if (that.data.isRememberPwd == true) {

    wx.setStorage({
      key: 'account_name',
      data: that.data.account_name,
      success: function (res) {
        console.log('cache username ok ')
      }
    })

    wx.setStorage({
      key: 'account_pwd',
      data: that.data.account_pwd,
      success: function (res) {
        console.log('cache password ok ')
      }
    })
  } 
}