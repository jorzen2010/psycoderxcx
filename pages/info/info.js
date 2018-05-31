var city = require("../../utils/city.js");
const app = getApp()
Page({
  data: {
    imgpre: app.globalData.apiUrl,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasuserInfo:false,
    userInfo:{}
  },
  onLoad: function () {
  },


  bindgetuserinfo: function (e) {
    var that = this;
    console.log(e);
    console.log(e.detail.userInfo);
    app.globalData.userInfo = e.detail.userInfo;
    app.globalData.ifauthuserinfo = true;
    wx.switchTab({
      url: '../../pages/index/index',
    })

  },
})