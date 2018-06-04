const app = getApp();

//通过ID获取素材内容
const getSucaiById = (cid) => new Promise((resolve) => {
  wx.request({
    url: app.globalData.apiUrl + "/api/GetXCXSucai?cid=" + cid,
    headers: {
      'Content-Type': 'application/json'
    },
    success: function (res) {
      resolve(res.data);
      //  console.log(res.data);
    },
  });
});


const getVideoSucaiById = (cid) => new Promise((resolve) => {

  wx.request({
    url: app.globalData.apiUrl + '/api/GetXCXVideoSucai?cid=' + cid,
    headers: {
      'Content-Type': 'application/json'
    },
    success: function (res) {
      resolve(res);
    }
  });

});

const fensiLogin=(jscode)=>new Promise((resolve)=>{
  wx.request({
    url: app.globalData.apiUrl + '/api/OnLogin?js_code=' + jscode,
    headers: {
      'Content-Type': 'application/json'
    },
    success: function (res) {
      resolve(res.data);
      console.log('openid:' + res.data.openid);
      console.log('session_key:' + res.data.session_key);
    }
  })
});


const GetFensiByopenid = (openid) => new Promise((resolve) => {
  wx.request({
    url: app.globalData.apiUrl + '/api/GetFensiUserByopenid?pid=' + app.globalData.zixunshi_id + '&openid=' + openid,
    headers: {
      'Content-Type': 'application/json'
    },
    success: function (res) {
      resolve(res.data);
   //   console.log(res.data);
    }
  })

});

const CreateFensi = (openid) => new Promise((resolve) => {
  var uinfo=JSON.stringify(app.globalData.userInfo);
  wx.request({
    url: app.globalData.apiUrl + '/api/CreateFensiUser?openid=' + openid + '&pid=' + app.globalData.zixunshi_id,
    method:'POST',
    data:{
      userinfo: uinfo
    },
    headers: {
      'Content-Type': 'x-www-form-urlencoded'
    },
    success: function (res) {
      resolve(res);
    //console.log(res);
      console.log(app.globalData.userInfo);
    }
  })

});

//通过ID获取问题
const getQuestionById = (qid) => new Promise((resolve) => {
  wx.request({
    url: app.globalData.apiUrl + "/api/GetQuestionById?qid=" + qid,
    headers: {
      'Content-Type': 'application/json'
    },
    success: function (res) {
      resolve(res.data);
      //  console.log(res.data);
    },
  });
});




//暴露接口给外部使用
module.exports = {
  getSucaiById: getSucaiById,
  getVideoSucaiById: getVideoSucaiById,
  fensiLogin: fensiLogin,
  GetFensiByopenid: GetFensiByopenid,
  CreateFensi: CreateFensi,
  getQuestionById: getQuestionById
}
