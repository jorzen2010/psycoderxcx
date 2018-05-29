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
  },
  onLoad:function(option) {
    var that = this//不要漏了这句，很重要
    that.setData({
      id: option.id
    })    
    wx.request({
      url: app.globalData.apiUrl + '/api/GetXCXVideoSucai?cid=' + that.data.id,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          sucai: res.data.sucai,
          videoUrlfo: res.data.videoUrlfo,
          audiosrc: res.data.videoUrlfo.PlayInfoList.PlayInfo[1].PlayURL,
          duration: res.data.videoUrlfo.VideoBase.Duration
        });      
        innerAudioContext.src = res.data.videoUrlfo.PlayInfoList.PlayInfo[1].PlayURL;
        // console.log(res.data.sucai);
        // console.log(res.data.videoUrlfo);
        // console.log(res.data.videoUrlfo.PlayInfoList.PlayInfo[1].PlayURL);
        // console.log(res.data.videoUrlfo.VideoBase.Duration);
        // console.log(that.sucai);
        // console.log(that.videoUrlfo);
        // console.log(that.audiosrc);
        // console.log(that.duration);
      }
    });

    innerAudioContext.onTimeUpdate(() => {
      console.log('时间发生变化了' + innerAudioContext.currentTime);
      that.setData({
        percent: (innerAudioContext.currentTime / that.duration)*100
      })
      console.log('时间轴' + that.percent);
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



    // innerAudioContext.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46';
    // that.audiosrc = innerAudioContext.src;

    // innerAudioContext.onTimeUpdate(() => {
    //   console.log('时间发生变化了' + innerAudioContext.currentTime);
    // });
    // innerAudioContext.onPlay(() => {
    //   console.log('开始播放' + innerAudioContext.duration);
    // });
    // innerAudioContext.onCanplay(() => {
    //   console.log('可以播放' + innerAudioContext.duration);
    // });