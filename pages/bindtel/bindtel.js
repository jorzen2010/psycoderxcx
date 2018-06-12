var interval = null; //倒计时函数
const app = getApp();
Page({
  data: {
    disabled: true,
    phoneNum: '',
    time: '获取验证码', //倒计时 
    currentTime: 61,
    smgcode:0
  },

  // 手机号部分
  inputPhoneNum: function (e) {
    let phoneNum = e.detail.value
    if (phoneNum.length === 11) {
      let checkedNum = this.checkPhoneNum(phoneNum)
      if (checkedNum) {
        this.setData({
          phoneNum: phoneNum
        })
        console.log('phoneNum' + this.data.phoneNum)
        this.setData({
          disabled: false
        })
      }
    } else {
      this.setData({
        phoneNum: ''
      })
      this.setData({
        disabled: true
      })
    }
  },

  checkPhoneNum: function (phoneNum) {
    let str = /^1\d{10}$/
    if (str.test(phoneNum)) {
      return true
    } else {
      wx.showToast({
        title: '手机号不正确',
        image: '../../src/images/fail.png'
      })
      return false
    }
  },

  getCode: function (options) {
    var that = this;
    wx.request({
      url: app.globalData.apiUrl + '/api/GetSmgCode?tel=' + that.data.phoneNum,
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data.smgcode);
        that.setData({
          smgcode: res.data.smgcode
        })

        var currentTime = that.data.currentTime
        interval = setInterval(function () {
          currentTime--;
          that.setData({
            time: currentTime + '秒',
            disabled: true,
          })
          if (currentTime <= 0) {
            clearInterval(interval)
            that.setData({
              time: '重新发送',
              currentTime: 61,
              disabled: false
            })
          }
        }, 1000)

      }

    })
    
  },


 
  SubmitTel: function (e) {
    var that=this;
    console.log(that.data.smgcode);
    if (e.detail.value.smscode == that.data.smgcode)
    {
      wx.request({
        url: app.globalData.apiUrl + '/api/UpdateFensiTel?tel=' + that.data.phoneNum + '&cid=' + app.globalData.fensi_id,
        header: {
          'content-type': 'application/json'
        },
        method: 'POST',
        success:function(){
          wx.showModal({
            title: '绑定手机成功',
            content: '现在你可以申请成为会员',
            showCancel:false,
            success: function () {
              wx.switchTab({
                url: '../../pages/index/index',
              })
            }
          })

        }
      })
      
    }
    else
    {
      wx.showToast({
        title: '验证码错误',
        image: '../../src/images/fail.png'
      })
    }

  }
})