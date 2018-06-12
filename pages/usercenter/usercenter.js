var util = require("../../utils/common.js");
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    ifhasuserInfo: app.globalData.ifauthuserinfo,
    ziyoucount:0,
    zixuncount:0,
    questioncount:0
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that=this;
    that.getZiyouReplyCount(app.globalData.zixunshi_id);
    that.getZixunReplyCount(app.globalData.zixunshi_id);
    that.getQuestionReplyCount(app.globalData.zixunshi_id);
  
      that.setData({
        userInfo: app.globalData.userInfo,
        ifhasuserInfo:true
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

  getZiyouReplyCount:function(){
    var that = this;

    wx.request({
      url: app.globalData.apiUrl + '/api/GetZiyoushuxieCount?pid=' + app.globalData.zixunshi_id + '&fid=' + app.globalData.fensi_id,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          ziyoucount:res.data,
        })

      }
    })
  },

  getZixunReplyCount: function () {
    var that = this;

    wx.request({
      url: app.globalData.apiUrl + '/api/GetZixunCount?pid=' + app.globalData.zixunshi_id + '&fid=' + app.globalData.fensi_id,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          zixuncount: res.data,
        })

      }
    })
  },

  getQuestionReplyCount: function () {
    var that = this;
    wx.request({
      url: app.globalData.apiUrl + '/api/GetQuestionReplyCount?pid=' + app.globalData.zixunshi_id + '&fid=' + app.globalData.fensi_id,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          questioncount: res.data,
        })

      }
    })
  },
  aboutsoftware:function(){
    wx.showModal({
      title: '软件信息',
      content: '如使用中遇到问题，可联系软件管理员微信sky0100',
      showCancel:false
    })
  },
  bindtel:function(){
    wx.navigateTo({
      url: '../../pages/bindtel/bindtel',
    })
  },
  VipBtn: function () {
    wx.request({
      url: app.globalData.apiUrl + '/api/GetVipOrderByFensiId?cid=' + app.globalData.fensi_id,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if (res.data.ifHasVip) {
          wx.showModal({
            title: '温馨提示',
            content: '你已经是会员了, 到期时间为：' + util.formatDateStamp(res.data.order.ExpiryTime, "short"),
            showCancel: false,
          })
        }
        else {
          wx.request({
            url: app.globalData.apiUrl + '/api/GetFensiById?cid=' + app.globalData.fensi_id,
            headers: {
              'Content-Type': 'application/json'
            },
            success: function (res) {

              if (res.data.ifHasTel) {
                wx.navigateTo({
                  url: '../../pages/vipuser/vipuser',
                })
              }
              else {
                wx.showModal({
                  title: '未绑定手机号',
                  content: '点击确定先绑定手机号',
                  showCancel: false,
                  success: function () {
                    wx.navigateTo({
                      url: '../../pages/bindtel/bindtel',
                    })
                  }
                })
              }
            }
          })
        }

      }
    })
  }

})