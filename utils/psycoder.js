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

//暴露接口给外部使用
module.exports = {
  getSucaiById: getSucaiById
}