// pages/waybill_details/waybill_details.js
const Api = require('../../utils/api.js')
const jsonUtil = require('../../utils/json.js')
const HttpUtil = require('../../utils/Http.js')
const app = getApp()
var userId; 
var token = app.globalData.Token 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    waybillNo:"",
    WeightDiff:"",
    mayPrice:"",
    realPrice:"",
    lossPrice :"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      //LzzuserInfo: app.globalData.LzzUserInfo,
      //roleCode: app.globalData.roleCode
    })
    //console.log(app.globalData.roleCode) 
    //userId = app.globalData.LzzUserInfo.userId; 
    var that = this;
    console.log("id" + options.id) ; 
    that.setData({
      id: options.id
    });
    logon_waybill_info(this)
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
  /**
   * 装货
   */
  sureLoad_from:function (e) {
    var receiveman = e.detail.value.receiveman
    var receivephone = e.detail.value.receivephone
    var sunhao = e.detail.value.sunhao
    var receiveaddress = e.detail.value.receiveaddress
    var loadweight = e.detail.value.loadweight
    if (receiveman.length == 0) {
      wx.showModal({
        title: '提示',
        content: "请输入账号",
        showCancel: false,
        success: function (res) {
        }
      });
      return;
    }
    else if (receiveman.length == 0) {
      wx.showModal({
        title: '提示',
        content: "请输入收货人",
        showCancel: false,
        success: function (res) {
        }
      });
      return;
    }
    else if (receivephone.length == 0) {
      wx.showModal({
        title: '提示',
        content: "请输入收货人电话",
        showCancel: false,
        success: function (res) {
        }
      });
      return;
    }
    else if (sunhao.length == 0) {
      wx.showModal({
        title: '提示',
        content: "请输入损耗范围",
        showCancel: false,
        success: function (res) {
        }
      });
      return;
    }
    else if (receiveaddress.length == 0) {
      wx.showModal({
        title: '提示',
        content: "请输入收货地址",
        showCancel: false,
        success: function (res) {
        }
      });
      return;
    }
    else if (loadweight.length == 0) {
      wx.showModal({
        title: '提示',
        content: "请输入装货重量",
        showCancel: false,
        success: function (res) {
        }
      });
      return;
    }
    var that = this;
    var url = Api.waybill_sure_load;
    let map = new Map();
    map.set('receiveGoodsPerson', receiveman);
    map.set('receiveGoodsMobile', receivephone);
    map.set('loss', sunhao);
    map.set('receiveGoodsAddress', receiveaddress);
    map.set('loadWeight', loadweight);
    map.set('waybillNo', that.data.waybillNo);
    console.log("userId"+userId)
    map.set('userId', "" + userId);
    map.set('useTerminal', '8');
    map.set('accessToken', token);
    let jsonData = jsonUtil.mapToJson(map);
    HttpUtil._post_from(url, jsonData ,
      function (res) {
        console.log(res)
        var data = res.data
        if (data.code==0){
          wx.showToast({
            title: '装货成功',
            icon: 'succes',
            duration: 1000,
            mask: true
          });
          wx.navigateBack({
            url: "waybill?pageNo=1"
          })
        }
        else{
          showWarning(data.msg)
        }
      },
      function (res) {
        showWarning("网络连接异常")
    })

  },
  /**
   * 卸货重量运算
   */
  unloadWeight_Chend:function (e){ 
    let that = this;

    var dealWaybills = that.data.dealWaybills;
    var price = dealWaybills.price;
    var loadWeight = dealWaybills.loadWeight;
    this.setData({
      WeightDiff : (loadWeight - e.detail.value).toFixed(2),
      UnLoadWeigth: e.detail.value
    })
    this.setData({
      mayPrice: (e.detail.value * price).toFixed(2),
      lossPrice : ""
    })
  },
  /**
   * 扣损运费 运算
   */
  lossprice_Chend:function(e){
    var lossPrice
    if (e.detail.value == null)
    {
      lossPrice = e;
    }else{
      lossPrice = e.detail.value;
    }
    let that = this;
    let mayPrice = that.data.mayPrice
    
    let dealWaybills = that.data.dealWaybills;
    that.setData({
      realPrice: (mayPrice - lossPrice - dealWaybills.infoFee - dealWaybills.limitPrice).toFixed(2),
      lossPrice: lossPrice
    })
  },

  /**
   * 收货
   */
  Receipt_from:function(e){
    let that = this;
    var payer = e.detail.value.payer;
    var payerPhone = e.detail.value.payerPhone;
    var unloadWeight = e.detail.value.unloadWeight;
    var lossprice = e.detail.value.lossprice; 
    if (payer == "") {
      showWarning("请输入结算人");
      return;
    }
    if (payerPhone == "") {
      showWarning("请输入结算人电话");
      return;
    }
    if (unloadWeight == "") {
      showWarning("请输入卸货重量");
      return;
    }
    if (lossprice == "") {
      showWarning("请输入损耗运费");
      return;
    }
    var realPrice = e.detail.value.realPrice;
    var transationPrice = e.detail.value.maypay;
    let map = new Map();
    map.set('useTerminal', ""+8);
    map.set('waybillNo', that.data.waybillNo);
    map.set('updateUser', ""+userId );
    map.set('accessToken', token);
    map.set('actionCode', ""+1); 
    map.set('payer', payer);
    map.set('payerPhone', payerPhone);
    map.set('unloadWeight', unloadWeight);
    map.set('lossPrice', lossprice);
    map.set('realPrice', realPrice);
    map.set('transationPrice', transationPrice);
    let jsonData = jsonUtil.mapToJson(map);  
    var url = Api.waybill_receive_load;
    HttpUtil._post_from(url, jsonData,
      function (res) {
        var data = res.data
        if (data.code == 0) {
          wx.showToast({
            title: '收货成功',
            icon: 'succes',
            duration: 1000,
            mask: true
          });
          wx.navigateBack({
            url: "waybill?pageNo=1"
          })
        }
        else{
          showWarning(data.msg)
        }
      },
      function (res) {
        showWarning("网络连接异常")
    })
  }
})
/**
 * 加载运单信息
 */
function logon_waybill_info (that) {
  var url = Api.user_details;
   
  console.log(that)
  var jsonData = "id=" + that.data.id;
  HttpUtil._get(url + jsonData,
    function (res) {
      var data = res.data
      console.log("-----------------")
      console.log(data.user)
      if (data.code == 0) {
        that.setData({
          user: data.user
        })
      }
    },
    function (res) {
      console.log(res);
    })
}
function showWarning(text)
{
  wx.showModal({
    title: '提示',
    content: text,
    showCancel: false,
    success: function (res) {
    }
  });
}