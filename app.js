//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log('打开的时候就已经登录了');
        console.log(res.code);
        var that=this;
        wx.request({
          url: this.globalData.apiUrl + '/api/OnLogin?js_code=' + res.code,
          headers: {
            'Content-Type': 'application/json'
          },
          success: function (res) {
            console.log('openid:' + res.data.openid);
            console.log('session_key:' + res.data.session_key);
            //通过openid找一个粉丝用户，如果有就赋值，如果没有就新增一个用户。
            wx.getSetting({
              success: res => {
                if (res.authSetting['scope.userInfo']) {
                  //  已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                  wx.getUserInfo({
                    success: res => {
                      // 可以将 res 发送给后台解码出 unionId
                      that.globalData.userInfo = res.userInfo;
                      that.globalData.ifauthuserinfo=true;
                      console.log('有授权' + that.globalData.userInfo);
                      console.log('有授权' + that.globalData.ifauthuserinfo);
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
          }
        })


        // wx.checkSession({
        //   success:function(){
        //     console.log('sessionkey未过期');
        //   },
        //   fail:function(){
        //     wx.request({
        //       url: apiUrl+'/api/OnLogin?js_code=' + res.code,
        //       headers: {
        //         'Content-Type': 'application/json'
        //       },
        //       success: function (res) {
        //         console.log('openid:' + res.data.openid);
        //         console.log('session_key:' + res.data.session_key);
        //       }
        //     })
        //   }
        // })

        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //     //  已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  globalData: {
    userInfo:null,
    zixunshi:null,
    zixunshi_id:'1',
    ifauthuserinfo:false,
    ifVip:false,
  //apiUrl: "http://localhost:3517"
    apiUrl:"https://mp.psycoder.zzd123.com"
  }
})