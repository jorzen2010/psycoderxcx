const psycoder = require('../../utils/psycoder.js');
const app = getApp();
Page({
  data: {
    imgpre: app.globalData.apiUrl,
    zixunshi: {},
    topsucailist: []
  },
  onLoad: function () {
    var that = this
    that.getpsyUserInfo();
    that.gettuwenlist();
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

  gettuwenlist: function () {
    var that = this;//不要漏了这句，很重要
    var url = app.globalData.apiUrl + '/api/GetTopSelectedXCXSucaiList?pid=' + app.globalData.zixunshi_id + '&size=5&type=tuwen'
    wx.request({
      url: url,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        Promise.all(res.data.xcxsucai.map(item => psycoder.getSucaiById(item.Sucai)))
          .then(function (result) {
            that.setData({
              topsucailist: result,
            });
            console.log(result);
          });

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