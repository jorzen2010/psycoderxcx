const network = require('../../utils/networkasy.js')
const app = getApp();
Page({
  data:{
    selectsxlist:[],
    sclist:[],
    pagecount:0,
    sucai:{}
  },
  onLoad: function () {

    var that=this;
    
    

    that.getJSON().then(function (json) {
      console.log('Contents: ' + json);
    }, function (error) {
      console.error('出错了', error);
    });
  },

   getJSON : function () {
     var _this=this;
    const promise = new Promise(function (resolve, reject) {
      const handler = function () {
        if (this.readyState !== 4) {
          return;
        }
        if (this.status === 200) {
          resolve(this.response);
        } else {
          reject(new Error(this.statusText));
        }
      };
      wx.request({
        url: app.globalData.apiUrl + "api/GetSelectedXCXSucaiList?pid=" + app.globalData.zixunshi_id,
        headers: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          _this.setData({
            selectsxlist: res.data.selectsucai,
          });
          console.log('赋值结束' + _this.data.selectsxlist[0].Sucai);
        }
      });

    });

    return promise;
  },
  getSelectSucaiByPId: function () {

    var _this = this;//不要漏了这句，很重要

    wx.request({
      url: app.globalData.apiUrl + "api/GetSelectedXCXSucaiList?pid=" + app.globalData.zixunshi_id,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        _this.setData({
          selectsxlist: res.data.selectsucai,
        });
        console.log('赋值结束' + _this.data.selectsxlist);
      }
    });

  },

  getSucaiById: function (cid) {
    var _this = this;
    wx.request({
      url: app.globalData.apiUrl + "api/GetXCXSucai?cid=" + cid,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
       // _this.sclist.push(res.data);
       // console.log(res.data);

      },
      complete: function (res) {
        return res.data;
      }
    });

  }

})