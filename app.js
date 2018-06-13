//app.js
App({
  onLaunch: function () {
    var that=this;
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          //  已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              that.globalData.userInfo = res.userInfo;
              that.globalData.ifauthuserinfo = true;
              // console.log('有授权' + that.globalData.userInfo);
              // console.log('有授权' + that.globalData.ifauthuserinfo);
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (that.userInfoReadyCallback) {
                that.userInfoReadyCallback(res)
              }
            }
          })
        }
        else {
          that.globalData.ifauthuserinfo = false;
          wx.redirectTo({
            url: '../../pages/info/info',
          })
          console.log('没授权' + that.globalData.ifauthuserinfo);
        }
      }
    })
   
  },
  globalData: {
    userInfo:null,
    zixunshi:null,
    zixunshi_id:'1',
    ifauthuserinfo:false,
    ifVip:false,
    fensi_id:'0',
    //apiUrl: "http://localhost:3517"
   apiUrl:"https://mp.psycoder.zzd123.com"
  }
})