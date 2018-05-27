const network = require('../../utils/networkasy.js')
const app = getApp();

const getSucaiById = (cid) => new Promise((resolve) => {
  wx.request({
    url: app.globalData.apiUrl + "api/GetXCXSucai?cid=" + cid,
    headers: {
      'Content-Type': 'application/json'
    },
    success: function (res) {
      resolve(res.data);
      //  console.log(res.data);
    },
  });
});


Page({
  data: {
    sclist: [],
    sucai: {}
  },
  onLoad: function () {

    var that = this;


        wx.request({
          url: app.globalData.apiUrl + "api/GetSelectedXCXSucaiList?pid=" + app.globalData.zixunshi_id,
          headers: {
            'Content-Type': 'application/json'
          },
          success: function (res) {
           // resolve(res.data.selectsucai);
            Promise.all(res.data.selectsucai.map(item => getSucaiById(item.Sucai)))
            .then(function(result){
              that.setData({
                sclist: result,
              });
              console.log(result);
            });
            //  console.log(res.data.selectsucai);
          }
        });



    // that.getSelectSucaiByPId()
    // .then(function (data) {
    //   Promise.all([data.map(item => getSucaiById(item.Sucai))]);
    // })
    // .then(function(result){
    //  // console.log(result);
    //   });
    // Promise.all([getSucaiById(9), getSucaiById(6)])
    // .then(function(result){
    //   console.log(result);
    // });
    
  },



  // getSelectSucaiByPId: function () {
  //   var _this = this;
  //   return new Promise(function (resolve, reject) {

  //     wx.request({
  //       url: app.globalData.apiUrl + "api/GetSelectedXCXSucaiList?pid=" + app.globalData.zixunshi_id,
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       success: function (res) {
  //        resolve(res.data.selectsucai);
  //      //  console.log(res.data.selectsucai);
  //       }
  //     });
  //   });
  // },


  // getSucaiById: function (cid) {

  //   return new Promise(function (resolve, reject) {
  //   wx.request({
  //     url: app.globalData.apiUrl + "api/GetXCXSucai?cid=" + cid,
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     success: function (res) {
  //     resolve(res.data);
  //   //  console.log(res.data);
  //     },
  //   });
  //   });
  // },
  

    
    





})