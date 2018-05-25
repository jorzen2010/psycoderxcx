function SkyAsyPost(url, params) {
  let promise = new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: params,
      method: 'POST',
      success: function (res) {
        resolve(res);
      }
    })
  });
  return promise
};
function SkyAsyGet(url, params) {
  let promise = new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: params,
      method: 'GET',
      success: function (res) {
        resolve(res);
      }
    })
  });
  return promise
};



module.exports = {
  SkyAsyPost: SkyAsyPost,
  SkyAsyGet: SkyAsyGet
}
