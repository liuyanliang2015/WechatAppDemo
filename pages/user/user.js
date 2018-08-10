// pages/waybill/waybill.js 
const Api = require('../../utils/api.js')
const jsonUtil = require('../../utils/json.js')
const HttpUtil = require('../../utils/Http.js') 

var totalPageNum = 5
var pageNo = 1
var userId ;

var Getlist = function(that)
{
  that.setData({ 
    messge: "加载中"
  });

  if (pageNo > totalPageNum)
  {
    console.log("进来了")
    that.setData({
      isHideLoadMore: false,
      messge:"------我是有底线的----"
    });
    console.log(that.data.isHideLoadMore);
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
    return;
  }

  var url = Api.user_list_url;
  var datas = "&pageNo=" + pageNo;
  HttpUtil._get(url + datas,
    function(res)
    {
      var list = that.data.list;
      var data = res.data;
      console.log(data);
      totalPageNum = data.totalPageNum;
      
      for (var i = 0; i < data.dataList.length; i++) {
        list.push(data.dataList[i]);
      }
      that.setData({
        list: list,
        isHideLoadMore: false
      });
      console.log(that.data.list);
      pageNo ++;
      console.log("totalPageNum :" + data.totalPageNum)
      console.log("pageNo :" + pageNo)
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    },
    function(res)
    {
      console.log("加载错误");
      that.setData({
        isHideLoadMore: false,
        messge:"网络异常"
      });
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
      wx.showModal({
        title: '提示',
        content: that.data.messge,
        showCancel: false,
        success: function (res) {
        }
      });
    }
  )

}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radioCheckVal:0,
    list:[],
    scrollTop: 0,
    scrollHeight: 0,  
    isHideLoadMore:true,
    
  },
  radioCheckedChange: function (e) {
    
    var strList = e.detail.value.split(","); 
    this.setData({
      radioCheckVal: strList[0]
    });
    let that = this
    orderStatus = strList[1]
    //console.log("查询：" + strList[1]);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {   
    var that = this;
    //userInfo(that);
    wx.getSystemInfo({
      success: function (res) {
        //console.info("屏幕分辨率"+res.windowHeight);
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
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
     
    var that = this;
    refresh(this)
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
    
    //刷新
    let that = this
    refresh(that);
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
  //  该方法绑定了页面滑动到底部的事件
  bindDownLoad: function () {
    
    wx.showNavigationBarLoading() //在标题栏中显示加载  
    var that = this;
    Getlist(that);
  },

  scroll: function (event) {
    //  该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
    this.setData({
      scrollTop: event.detail.scrollTop
    });
   // console.log(event.detail.scrollTop)
  },
  toWaybill_details:function(e){
    //data-url 用 el.dataset.url 来访问。
    console.log(e.currentTarget.dataset.url)
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    })
  },
  
})
function refresh(that) {
  wx.showNavigationBarLoading() //在标题栏中显示加载
  pageNo = 1;
  that.setData({
    list: [],
    scrollTop: 0,
    isHideLoadMore: true
  }); 
  Getlist(that)
}
