const psycoder = require('../../utils/psycoder.js');
const app = getApp();
Page({
  data: {
    imgpre: app.globalData.apiUrl,
    zixunshi: {}
  },
  onLoad: function () {
    var that = this

      that.getpsyUserInfo();

    
  },


  getpsyUserInfo: function () {
    var that = this//不要漏了这句，很重要
    wx.request({
      url: app.globalData.apiUrl + '/api/GetPsyUser?pid=' + app.globalData.zixunshi_id,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          zixunshi: res.data,
        })
      }
    })
  },
  navcontent: function (event) {
    //这种方式不能链接tab里的内容
    console.log('从链接处获得的id值' + event.currentTarget.dataset.id);
    wx.navigateTo({
      url: "../../pages/content/content?id=" + event.currentTarget.dataset.id
    })
  },
})