//index.js  
//获取应用实例  
var app = getApp()
Page({
  data: {
    /** 
        * 页面配置 
        */
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
  },
  onLoad: function () {
    var that = this;

    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
  },
  /** 
     * 滑动切换tab 
     */
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
    // showok: function () {
  //   wx.showToast({
  //     title: '成功',
  //     icon: 'success',
  //     duration: 2000
  //   })
  // },
  // modalcnt: function (event) {
  //   wx.showModal({
  //     title: '提示',
  //     content: '这是一个模态弹窗' + event.target.dataset.id,
  //     success: function (res) {
  //       if (res.confirm) {
  //         console.log('用户点击确定')
  //       } else if (res.cancel) {
  //         console.log('用户点击取消')
  //       }
  //     }
  //   })
  // },
  // actionsheet:function(){
  //   wx.showActionSheet({
  //     itemList: ['A', 'B', 'C'],
  //     success: function (res) {
  //       console.log(res.tapIndex)
  //     },
  //     fail: function (res) {
  //       console.log(res.errMsg)
  //     }
  //   })
  // },


})  