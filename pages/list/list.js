//获取应用实例
var util = require("../../utils/common.js");
const psycoder = require('../../utils/psycoder.js')
const app = getApp();
var page = 1;
Page({
  data:{
    imgpre: app.globalData.apiUrl,
    sclist: [],
    sucai: {},
    pagecount:0
  },

  onLoad: function () {
    var that = this//不要漏了这句，很重要
    
    wx.request({
      url: app.globalData.apiUrl + "/api/GetSelectedTuwenXCXSucaiList?pid=" + app.globalData.zixunshi_id,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          pagecount: res.data.pagecount,
        });
        // resolve(res.data.selectsucai);
        Promise.all(res.data.selectsucai.map(item => psycoder.getSucaiById(item.Sucai)))
          .then(function (result) {
            that.setData({
              sclist: result,
            });
            console.log(result);
          });
        //  console.log(res.data.selectsucai);
      }
    });

  },
  navcontent: function (event){
    //这种方式不能链接tab里的内容
    console.log('从链接处获得的id值'+event.currentTarget.dataset.id);
    wx.navigateTo({
      url: "../../pages/content/content?id=" + event.currentTarget.dataset.id
    })
  },
  onPullDownRefresh: function () {
    // 显示顶部刷新图标  
    wx.showNavigationBarLoading();
    var that = this;
    var allMsg = that.data.sclist; 
    if (that.data.pagecount!=page)
    {
    page++;
    wx.request({
      url: app.globalData.apiUrl + "/api/GetSelectedTuwenXCXSucaiList?pid=" + app.globalData.zixunshi_id+"&page="+page,
    //  url: app.globalData.apiUrl +'/api/test?page='+page,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {

        Promise.all(res.data.selectsucai.map(item => psycoder.getSucaiById(item.Sucai)))
          .then(function (result) {
            // that.setData({
            //   sclist: result,
            // });
            // console.log(result);
            for (var i = 0; i < result.length; i++) {
              allMsg.push(result[i]);
              console.log(result[i].Id);
            }
            that.setData({
              sclist: allMsg
            });


          });
        // 不能直接 allMsg.push(res); 相当于list.push(list);打乱了结构  
        // for (var i = 0; i < res.data.xcxsucai.length; i++) {
        //   allMsg.push(res.data.xcxsucai[i]);
        //   console.log(res.data.xcxsucai[i].Id);
        // }
        // that.setData({
        //   sclist: allMsg
        // });

        // 隐藏导航栏加载框  
        wx.hideNavigationBarLoading();
        // 停止下拉动作  
        wx.stopPullDownRefresh();
      }
    })
    }
    else
    {
      wx.showToast({
        title: '没有更多了',
        icon: 'success',
        duration: 1000
      })
      // 隐藏导航栏加载框  
      wx.hideNavigationBarLoading();
      // 停止下拉动作  
      wx.stopPullDownRefresh();
    }
  },
  onReachBottom: function () {
    // 显示顶部刷新图标  
    // 显示加载图标  
    wx.showLoading({
      title: '玩命加载中',
    }) 
    var that = this;
    var allMsg = that.data.sclist;
    page++;
    wx.request({
      url: app.globalData.apiUrl + '/api/test?page=' + page,
      method: "GET",
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // 不能直接 allMsg.push(res); 相当于list.push(list);打乱了结构  
        for (var i = 0; i < res.data.xcxsucai.length; i++) {
          allMsg.push(res.data.xcxsucai[i]);
          console.log(res.data.xcxsucai[i].Id);
        }
        that.setData({
          sclist: allMsg
        });

        // that.setData({
        //   moment: res.data.data
        //  });
        // 设置数组元素  
        // that.setData({
        //    moment: that.data.moment
        //  });
        // console.log(that.data.moment);
        // 隐藏加载框  
        wx.hideLoading(); 
      }
    })
  }
})
