const app = getApp()
Page({
  data: {
    imgpre: app.globalData.apiUrl,
    zixunshi: {}
  },
  onLoad: function () {
    var that = this//不要漏了这句，很重要
    wx.request({
      url: app.globalData.apiUrl + 'api/GetPsyUser?pid=' + app.globalData.zixunshi_id,
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
  },
})