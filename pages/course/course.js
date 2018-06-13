const psycoder = require('../../utils/psycoder.js')
const app = getApp();
var page = 1;
Page({
  data: {
    imgpre: app.globalData.apiUrl,
    sclist: [],
    sucai: {},
    pagecount: 0,
    ifHasVip:false
  },
  onLoad: function () {

    var that = this;
    that.GetFensiVip();
        wx.request({
          url: app.globalData.apiUrl + "/api/GetSelectedXCXSucaiList?pid=" + app.globalData.zixunshi_id,
          headers: {
            'Content-Type': 'application/json'
          },
          success: function (res) {
            that.setData({
              pagecount: res.data.pagecount,
            });
            Promise.all(res.data.selectsucai.map(item => psycoder.getSucaiById(item.Sucai)))
            .then(function(result){
              that.setData({
                sclist: result,
              });
            //  console.log(result);
            });
          console.log(res.data.selectsucai);
          }
        });

  },
  navshipincontent: function (event) {
    if (this.data.ifHasVip)
    {
      wx.navigateTo({
        url: "../../pages/videoview/videoview?id=" + event.currentTarget.dataset.id
      })
    }
    else
    {
      wx.showModal({
        title: '会员通知',
        content: '此课程为会员专享，你可以在首页升级会员',
        showCancel:false,
        success:function(){
          wx.switchTab({
            url: "../../pages/index/index"
          })
        }
      })
    }  
            
  },
  navyinpincontent: function (event) {
    if (this.data.ifHasVip) {
      wx.navigateTo({
        url: "../../pages/audioview/audioview?id=" + event.currentTarget.dataset.id
      })
    }
    else {
      wx.showModal({
        title: '会员通知',
        content: '此课程为会员专享，你可以在首页升级会员',
        showCancel: false,
        success: function () {
          wx.switchTab({
            url: "../../pages/index/index"
          })
        }
      })
    }
    
  },


  onPullDownRefresh:function(){
    wx.showNavigationBarLoading();
    var that = this;
    var allMsg = that.data.sclist; 
    if (that.data.pagecount != page) {
      page++;

      wx.request({
        url: app.globalData.apiUrl + "/api/GetSelectedXCXSucaiList?pid=" + app.globalData.zixunshi_id +"&page="+page,
        headers: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          Promise.all(res.data.selectsucai.map(item => psycoder.getSucaiById(item.Sucai)))
            .then(function (result) {

              for (var i = 0; i < result.length; i++) {
                allMsg.push(result[i]);
                console.log(result[i].Id);
              }
              that.setData({
                sclist: allMsg
              });         
            });
          console.log(res.data.selectsucai);
        }
      });

      // 隐藏导航栏加载框  
      wx.hideNavigationBarLoading();
      // 停止下拉动作  
      wx.stopPullDownRefresh();

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
  onReachBottom:function(){
    var that=this;
    that.onPullDownRefresh();
  },

  GetFensiVip: function () {
    var _this = this;
    wx.request({
      url: app.globalData.apiUrl + '/api/GetVipOrderByFensiId?cid=' + app.globalData.fensi_id,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if (res.data.ifHasVip) {
          _this.setData({
            ifHasVip: true
          })

        }
        else {
          _this.setData({
            ifHasVip: false
          })
        }
      }
    });
    },

  
})