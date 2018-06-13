var util = require("../../utils/common.js");
var Wxparse = require("../../utils/wxParse/wxParse.js");
const app = getApp();
Page({
  data:{ 
    id:0,
    sucai:{},
    guanggao:{},
    sucaitype:false,
    article_content:'',
    imgpre:''
    
  },
  onLoad: function (option) {
    var that = this//不要漏了这句，很重要
    that.setData({
      id: option.id,
      imgpre: app.globalData.apiUrl,
    })
    that.GetGuanggaoByPsyUser();
    console.log(option.id); 
    console.log(that.data.id);
    
    wx.request({
      url: app.globalData.apiUrl + '/api/GetXCXSucai?cid=' + that.data.id,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //将获取到的json数据，存在名字叫zhihu的这个数组中
        res.data.CreateTime = util.formatDateStamp(res.data.CreateTime,"short");
        if (res.data.type=='tuwen')
        {
          that.setData({
          sucaitype:true
          })
         }
         else
         {
          that.setData({
            sucaitype:false
          })
         }
        
        that.setData({
          sucai: res.data,
         // article_content: Wxparse.wxParse('article_content', 'html', res.data.Content, that, 5)
          //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories
        });
        Wxparse.wxParse('article_content','html',res.data.Content,that,5)
      }
    });
  },

  GetGuanggaoByPsyUser:function(){
    var _this=this;
    wx.request({
      url: app.globalData.apiUrl + '/api/GetGuanggaoByPsyUser?pid=' + app.globalData.zixunshi_id,
      headers: {
        'Content-Type': 'application/json'
      },
      success:function(res){
        console.log(res.data);
        _this.setData({
          guanggao:res.data,

        })
      }
    })
  },
})