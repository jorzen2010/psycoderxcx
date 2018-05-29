var util = require("../../utils/common.js");
const app = getApp();
Page({
  data: {
    id: 0,
    videosucai: {},
    videoUrlfo:{}
  },
  onLoad: function (option) {
    this.setData({
      id: option.id,
      sucaitype: option.type
    })
    console.log(option.id);
    console.log(this.data.id);
    var that = this//不要漏了这句，很重要
    wx.request({
      url: app.globalData.apiUrl + '/api/GetXCXVideoSucai?cid=' + this.data.id,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //将获取到的json数据，存在名字叫zhihu的这个数组中
       // res.data.CreateTime = util.formatDateStamp(res.data.CreateTime, "short");
        that.setData({
          sucai: res.data.sucai,
          videoUrlfo: res.data.videoUrlfo,
          //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories
        })
      }
    });
    console.log("用id获取对象，并赋值给相应的字段名");
  }
})