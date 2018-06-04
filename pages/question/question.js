const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qlist:[],
    hudong: {},
    fensi_id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    wx.request({
      url: app.globalData.apiUrl + '/api/hudongset?pid=' + app.globalData.zixunshi_id,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.QuestionSelected);
        // Promise.all(res.data.QuestionSelected.map(item => psycoder.getSucaiById(item)))
        //   .then(function (result) {
        //     that.setData({
        //       sclist: result,
        //     });
        //     //  console.log(result);
        //   });

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
  formSubmit: function (e) {
    var that = this;
    that.setData({
      fensi_id: app.globalData.fensi_id
    });

    //  console.log(e.detail.value.ziyoushuxie);
    wx.request({
      url: app.globalData.apiUrl + '/api/CreateZixunReply?pid=' + app.globalData.zixunshi_id + '&fid=' + app.globalData.fensi_id + '&ReplyContent=' + e.detail.value.ziyoushuxie,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        // wx.showModal({
        //   title: '自由倾诉书写成功',
        //   content: '如果你想得到回复，请根据',
        // })

      }
    })
  }
})