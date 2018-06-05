const psycoder = require('../../utils/psycoder.js')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qid:0,
    hudong: {},
    question:{}
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.request({
      url: app.globalData.apiUrl + '/api/hudongset?pid=' + app.globalData.zixunshi_id,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          hudong:res.data,
          qid: options.id
        })
        console.log('传递过来的id' + that.qid);
        psycoder.getQuestionById(options.id)
        .then(function(data){
          console.log(data);
          that.setData({
            question:data
          })

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
  formSubmit: function (e) {
    var that=this;
    wx.request({
      url: app.globalData.apiUrl + '/api/CreateQuestionReply?pid=' + app.globalData.zixunshi_id + '&fid=' + app.globalData.fensi_id + '&ReplyContent=' + e.detail.value.qreply + '&qid=' + that.data.qid,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        wx.showModal({
          title: '你的想法很有意思哦',
          content: '想不想和我聊聊，首页下方有我的联系方式',
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