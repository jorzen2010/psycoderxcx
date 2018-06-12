var util = require("../../utils/common.js");
const psycoder = require('../../utils/psycoder.js');
const app = getApp();
Page({
  data: {
    imgpre: app.globalData.apiUrl,
    zixunshi: {},
    ifloadsuccess:false
  },
  onLoad: function () {
    var that = this
    wx.login({
      success: res => {
        console.log(res);
        console.log(res.code);
        psycoder.fensiLogin(res.code)
        .then(function(data){
           return psycoder.GetFensiByopenid(data.openid);
        })
        .then(function(data){         
          if(data.message.MessageStatus=='false')
          {
            psycoder.CreateFensi(data.openid, data.pid, app.globalData.userInfo)
            .then(function(result){
              console.log(result);
              return psycoder.GetFensiByopenid(result.data.openid);
            })
            .then(function(data){
              app.globalData.fensi_id = data.userinfo.Id;
              console.log(app.globalData.fensi_id);
            });
          }
          else
          {
            app.globalData.fensi_id = data.userinfo.Id;
            console.log(app.globalData.fensi_id);
          }
        });

      }
    })

      that.getpsyUserInfo();

    
  },

  gotoNav: function (event){

    if (event.currentTarget.dataset.id=='ziyou')
    {
      wx.navigateTo({
        url: "../../pages/ziyou/ziyou"
      })
    }
    if (event.currentTarget.dataset.id == 'renzhi') {
      wx.navigateTo({
        url: "../../pages/question/question"
      })
    }

    if (event.currentTarget.dataset.id == 'zixun') {
      wx.navigateTo({
        url: "../../pages/zixun/zixun"
      })
    }

    if (event.currentTarget.dataset.id == 'vip') {

      wx.request({
        url: app.globalData.apiUrl + '/api/GetVipOrderByFensiId?cid=' + app.globalData.fensi_id,
        headers: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          if (res.data.ifHasVip)
          {
            wx.showModal({
              title: '温馨提示',
              content: '你已经是会员了，到期时间为：' + util.formatDateStamp(res.data.order.ExpiryTime, "short"),
              showCancel:false,
            })
          }
          else
          {
            wx.request({
              url: app.globalData.apiUrl + '/api/GetFensiById?cid=' + app.globalData.fensi_id,
              headers: {
                'Content-Type': 'application/json'
              },
              success:function(res){

                if (res.data.ifHasTel)
                {
                  wx.navigateTo({
                    url: '../../pages/vipuser/vipuser',
                  })
                }
                else
                {
                  wx.showModal({
                    title: '未绑定手机号',
                    content: '点击确定先绑定手机号',
                    showCancel:false,
                    success:function(){
                      wx.navigateTo({
                        url: '../../pages/bindtel/bindtel',
                      })
                    }
                  })
                }
              }
            })
          }

        }
      })


      // wx.navigateTo({
      //   url: "../../pages/vipuser/vipuser"
      // })
    }

   
  },
  getpsyUserInfo: function () {
    var that = this//不要漏了这句，很重要
    wx.request({
      url: app.globalData.apiUrl + '/api/GetPsyUser?pid=' + app.globalData.zixunshi_id,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          zixunshi: res.data,
          ifloadsuccess:true
        })
      }
    })
  },
  navcontent: function (event) {
    //这种方式不能链接tab里的内容
    console.log('从链接处获得的id值' + event.currentTarget.dataset.id);
    wx.navigateTo({
      url: "../../pages/content/content?id=" + event.currentTarget.dataset.id
    })
  },
})