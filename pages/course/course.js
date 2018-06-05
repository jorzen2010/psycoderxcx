const psycoder = require('../../utils/psycoder.js')
const app = getApp();

Page({
  data: {
    imgpre: app.globalData.apiUrl,
    sclist: [],
    sucai: {}
  },
  onLoad: function () {

    var that = this;


        wx.request({
          url: app.globalData.apiUrl + "/api/GetSelectedXCXSucaiList?pid=" + app.globalData.zixunshi_id,
          headers: {
            'Content-Type': 'application/json'
          },
          success: function (res) {
           // resolve(res.data.selectsucai);
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

      wx.navigateTo({
        url: "../../pages/videoview/videoview?id=" + event.currentTarget.dataset.id
      })
  },
  navyinpincontent: function (event) {
    wx.navigateTo({
      url: "../../pages/audioview/audioview?id=" + event.currentTarget.dataset.id
    })
  },

  
})