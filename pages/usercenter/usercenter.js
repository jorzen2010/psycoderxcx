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
  }

})