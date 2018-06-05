const psycoder = require('../../utils/psycoder.js')
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
        var strs = new Array(); //定义一数组  
        strs = res.data.QuestionSelected.split(","); //字符分割
        Promise.all(strs.map(item => psycoder.getQuestionById(item)))
          .then(function (result) {
            that.setData({
              qlist: result,
            });
              console.log(result);
          });

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
 
  navcontent: function (event) {
    
    wx.navigateTo({
      url: "../../pages/questionreply/questionreply?id=" + event.currentTarget.dataset.id
    })
  },
})