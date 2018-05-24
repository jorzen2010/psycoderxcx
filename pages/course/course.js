const app = getApp();
Page({
  data:{
    selectsxlist:[],
    sclist:[],
    pagecount:0,
    sucai:{}
  },

  onLoad: function () {
    var that = this;//不要漏了这句，很重要

    var sucailist = that.data.sclist;
    var selectsxlist = that.data.selectsxlist;
    wx.request({
      url: app.globalData.apiUrl + "api/GetSelectedXCXSucaiList?pid=" + app.globalData.zixunshi_id,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        

        that.setData({
          selectsxlist: res.data.selectsucai,
        

        });
        for (var i = 0; i < that.data.selectsxlist.length; i++)
        {
          var obj = that.data.sucai;
          obj = that.getSucaiById(that.data.selectsxlist[i].Sucai);
          console.log('循环Id' + obj);
          sucailist.push(obj);
        }
      }
    });
    that.setData({
      sclist: sucailist,
    });
  },

  getSucaiById: function(cid){
  var _this=this;
    wx.request({
      url: app.globalData.apiUrl + "api/GetXCXSucaiJson?cid=" + cid,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
      console.log(res.data.Title);
    //  _this.data.sucai.Title = res.data.Title;
      _this.setData({
        sucai:res.data,
      });
      }
    });
    console.log('怎么从success里得到一个值');
    return _this.data.sucai;
  }
})