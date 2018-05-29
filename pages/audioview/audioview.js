const psycoder = require('../../utils/psycoder.js');
const innerAudioContext = wx.createInnerAudioContext();
const app = getApp();

Page({
  data: {
    id: 0,
    ifcanplay:true,
    videosucai: {},
    videoUrlfo: {},
    audiosrc:'',
    duration:0,
    percent:0,
    currentTime:0
  },
  onLoad:function(option) {
    var that = this;//不要漏了这句，很重要
    var audioduration=0;
    var audiaocurrenttime=0;
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
          duration: res.data.videoUrlfo.VideoBase.Duration
        }); 
        resolve(_this.data);
      }).then(function (res) {
        console.log('时长' + res.duration);
        innerAudioContext.src = res.audiosrc;
        audioduration = res.duration;
      });
 
        

    });


  

    innerAudioContext.onTimeUpdate(() => {
      console.log('时间发生变化了' + innerAudioContext.currentTime);
      console.log('时长' + parseInt(audioduration));
      audiaocurrenttime = (innerAudioContext.currentTime / audioduration) * 10000;
      console.log('播放时间' + parseInt(audiaocurrenttime));
      this.setData({
        percent: (innerAudioContext.currentTime / audioduration)*100,
        currentTime: innerAudioContext.currentTime
      })
     
    });
    innerAudioContext.onPlay(() => {
      console.log('开始播放' + that.duration);
    }); 
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
    })
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
})



