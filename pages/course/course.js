const app = getApp();
Page({
  data:{
    sclist:[],
    pagecount:0

  },

  onLoad: function () {
    var that = this//不要漏了这句，很重要
    wx.request({
      url: app.globalData.apiUrl + "api/GetXCXSucaiList?pid=" + app.globalData.zixunshi_id,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {

        var selectsucailist = res.data.selectsucai;
        var sucailist = [];
        for (var i = 0; i < selectsucailist.length; i++) {
          var selectsucai = this.getSucaiById(selectsucailist[i].Sucai);
          sucailist.push(selectsucai);
         // sucailist[i].CreateTime = util.formatTime(sucailist[i].CreateTime);
        }
        //将获取到的json数据，存在名字叫zhihu的这个数组中
        that.setData({
          sclist: sucailist,
          pagecount: res.data.pagecount

          //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories

        });
        console.log('成功获取数据');
      }
    })
  },

  getSucaiById:function(cid){
    var sucai=null;
    wx.request({
      url: app.globalData.apiUrl + "api/GetXCXSucaiList?cid=" + cid,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        sucai = res.data;
        return sucai;
        console.log('成功获取数据');
      }
    })

  }
})