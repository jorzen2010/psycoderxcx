var city = require("../../utils/city.js");
const app = getApp()
Page({
  data: {
    imgpre: app.globalData.apiUrl,
    zixunshi: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasuserInfo:false,
    userinfo:{}
  },
  onLoad: function () {
    var that=this
    that.getpsyUserInfo();
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          // wx.getUserInfo({
          //   success: function (res) {
          //     that.setData({
          //       hasuserInfo: true,
          //       userinfo: res.userInfo
          //       //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories
          //     })
          //     //这里应该直接插入到数据库里把这个人
          //     console.log(res.userInfo);
          //    console.log('成功授权');
          //   }
          // })
        }
      }
    })
  },
  // getUserInfo: function (e) {
  //    //这里应该直接插入到数据库里把这个人
  //   console.log(e.detail.userInfo);
  //   console.log(e.detail.userInfo.city);
  //   this.setData({
  //     hasuserInfo: true,
  //     userinfo: e.detail.userInfo
  //     //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories
  //   })
  // },

  getpsyUserInfo:function()
  {
    var that = this//不要漏了这句，很重要
    wx.request({
      url: app.globalData.apiUrl + '/api/GetPsyUser?pid=' + app.globalData.zixunshi_id,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //将获取到的json数据，存在名字叫zhihu的这个数组中
        that.setData({
          zixunshi: res.data,
          //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories
        })
      }
    })
  }
})