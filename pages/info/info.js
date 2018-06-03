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


    if (e.detail.errMsg=='getUserInfo:ok')
    {
      app.globalData.userInfo = e.detail.userInfo;
      app.globalData.ifauthuserinfo = true;
      wx.switchTab({
        url: '../../pages/index/index',
      })

    }
    else
    {
      console.log('授权失败');
      wx.showModal({
        title: '授权失败',
        content: '无法获取你的微信基本信息',
        showCancel:false,
      })
    }
    

  },
})