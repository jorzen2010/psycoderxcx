const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: app.globalData.userInfo,
    ifhasuserInfo: app.globalData.ifauthuserinfo
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that=this;
    if(that.data.userInfo)
    {
      that.setData({
        ifhasuserInfo:true
      })
    }
    else
    {
      that.setData({
        ifhasuserInfo: false
      })
    }
  
  },

  bindgetuserinfo:function(e){
    var that=this;
    console.log(e);
    console.log(e.detail.userInfo);
    app.globalData.userInfo = e.detail.userInfo;
    app.globalData.ifauthuserinfo=true;
    that.setData({
      userInfo:e.detail.userInfo,
      ifhasuserInfo: true
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
})