const psycoder = require('../../utils/psycoder.js');
const common = require('../../utils/common.js');
const innerAudioContext = wx.createInnerAudioContext();
const app = getApp();

Page({
  data: {
    imgpre: app.globalData.apiUrl,
    animation:{},
    id: 0,
    sucai:{},
    ifcanplay:true,
    videosucai: {},
    videoUrlfo: {},
    audiosrc:'',
    duration:0,
    durationsec:0,
    percent:0,
    currentTime:0
  },
  onLoad:function(option) {
    var that = this;//不要漏了这句，很重要
    var audioduration=0;
    that.setData({
      id: option.id
    });
    psycoder.getVideoSucaiById(that.data.id)
    .then(function(res){
      console.log(res.data.sucai);
      console.log(res.data.videoUrlfo);
      var _this=that;
      console.log(_this.data.id);
      new Promise((resolve)=>{
        console.log(_this.data.id);
        _this.setData({
          sucai: res.data.sucai,
          videoUrlfo: res.data.videoUrlfo,
          audiosrc: res.data.videoUrlfo.PlayInfoList.PlayInfo[1].PlayURL,
          duration: common.sec_to_time(Math.ceil(res.data.videoUrlfo.VideoBase.Duration)),
          durationsec: Math.ceil(res.data.videoUrlfo.VideoBase.Duration)
        }); 
        resolve(_this.data);
      }).then(function (res) {
        console.log('时长' + res.duration);
        innerAudioContext.src = res.audiosrc;
        audioduration = res.durationsec;
      });
 
        

    });


  

    innerAudioContext.onTimeUpdate(() => {
      console.log('时间发生变化了' + Math.ceil(innerAudioContext.currentTime));

      this.setData({
        percent: (innerAudioContext.currentTime / audioduration)*100,
        currentTime: common.sec_to_time(Math.ceil(innerAudioContext.currentTime))
      })
     
    });
    innerAudioContext.onPlay(() => {
      console.log('开始播放' + that.duration);
    }); 
  },
  onReady: function () {
    // 页面渲染完成

  },
  onShow:function(){
    
  },

  onUnload:function(){
    
    innerAudioContext.stop();
  },
  audioPlay: function () {
    innerAudioContext.play();
    this.setData({
      ifcanplay:false
    });
  },
  audioStop: function () {
    innerAudioContext.stop();
    this.setData({
      ifcanplay: true
    })

  },
  audioPause: function () {
    innerAudioContext.pause();
    this.setData({
      ifcanplay: true
    })

  },
  audiobackward:function(){
    innerAudioContext.seek(innerAudioContext.currentTime - 15);
    innerAudioContext.play(); 
    this.setData({
      ifcanplay: false
    })

  },
  
  audioforward: function () {
    innerAudioContext.seek(innerAudioContext.currentTime + 15);
    innerAudioContext.play();
    this.setData({
      ifcanplay: false
    })
  },
  audiolist:function(){
    wx.switchTab({
      url: '../../pages/course/course',
    })
  },
  audiozixun:function(){
    wx.switchTab({
      url: '../../pages/psyuser/psyuser',
    })
  },
//   rotate: function () {
//     //顺时针旋转10度
//     //
// var n=0;
// setInterval(function(){
//   n=n+1;
//   this.animation.rotate(2*n).step()
//   this.setData({
//     //输出动画
//     animation: this.animation.export()
//   })
// }.bind(this), 100)


//   },

})



