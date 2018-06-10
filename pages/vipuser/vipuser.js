const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    ifhasuserInfo: app.globalData.ifauthuserinfo,
    product:{},
    expireTime:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that=this;
    var date = new Date();
    var myDate = (date.getFullYear()+1) + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    that.setData({
        userInfo: app.globalData.userInfo,
        expireTime: myDate,
    });
    wx.request({
      url: app.globalData.apiUrl + '/api/GetProductByPid?pid=' + app.globalData.zixunshi_id,
    headers: {
      'Content-Type': 'x-www-form-urlencoded'
    },
      success:function(res){
        that.setData({
          product:res.data,
        })
      }
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

  formSubmit:function(e){
    var tel = e.detail.value.tel;;
    console.log(tel);
    wx.request({
      url: app.globalData.apiUrl + '/api/CreateVip?pid=' + app.globalData.zixunshi_id + '&cid=' + app.globalData.fensi_id+'&tel='+tel,
      headers: {
        'Content-Type': 'x-www-form-urlencoded'
      },
      data:{
        product: this.data.product
      },
      success: function (res) {
        wx.showModal({
          title: '申请成功',
          content: '申请已收到 \n 小秘书会尽快与您联系',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              wx.switchTab({
                url: '../../pages/index/index',
              })
            }
          }
        })
      }
    })
    
  }

})