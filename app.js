//app.js
App({
  onLaunch: function (res) {
    //console.log(res);
    //打开小程序的路径
    console.log(res.path);
    //打开小程序的场景值
    console.log(res.scene);


    // 展示本地存储能力
    var account = wx.getStorageSync('account_name');
    console.log("onLaunch-account:" + account);

    // 登录
    wx.login({
      success: res => {
        console.log("onLaunch-login:" + JSON.stringify(res));
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log("onLaunch-userInfo:" + JSON.stringify(res.userInfo));
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    WxUserInfo: wx.getStorageSync("WxUserInfo"),
    UserInfo: wx.getStorageSync("UserInfo")
  },onShow:function(){
    console.log("-----onShow----");
  },onHide:function(){
    console.log("-----onHide----");
  },onError: function (msg) {
    console.log("error message:"+msg)
  }


})