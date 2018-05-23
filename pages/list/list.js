//获取应用实例
const app = getApp();
var page = 1;
Page({
  data:{
    sclist:[]
  },
  showok: function () {
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 2000
    })
  },
  modalcnt: function (event) {
    wx.showModal({
      title: '提示',
      content: '这是一个模态弹窗' + event.target.dataset.id,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  actionsheet:function(){
    wx.showActionSheet({
      itemList: ['A', 'B', 'C'],
      success: function (res) {
        console.log(res.tapIndex)
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  onLoad: function () {
    var that = this//不要漏了这句，很重要
    wx.request({
      url: app.globalData.apiUrl+"api/test",
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //将获取到的json数据，存在名字叫zhihu的这个数组中
        that.setData({
          sclist: res.data.xcxsucai,
          
          //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories

        });
        console.log('成功获取数据');
      }
    })
  },
  navcontent: function (event){
    //这种方式不能链接tab里的内容
    console.log('从链接处获得的id值'+event.currentTarget.dataset.id);
    wx.navigateTo({
      url: "../../pages/content/content?id=" + event.currentTarget.dataset.id
    })
  },
  onPullDownRefresh: function () {
    // 显示顶部刷新图标  
    wx.showNavigationBarLoading();
    var that = this;
    var allMsg = that.data.sclist; 
    page++;
    wx.request({
      url: app.globalData.apiUrl +'api/test?page='+page,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // 不能直接 allMsg.push(res); 相当于list.push(list);打乱了结构  
        for (var i = 0; i < res.data.xcxsucai.length; i++) {
          allMsg.push(res.data.xcxsucai[i]);
          console.log(res.data.xcxsucai[i].Id);
        }
        that.setData({
          sclist: allMsg
        });
        
       // that.setData({
       //   moment: res.data.data
      //  });
        // 设置数组元素  
       // that.setData({
      //    moment: that.data.moment
      //  });
       // console.log(that.data.moment);
        // 隐藏导航栏加载框  
        wx.hideNavigationBarLoading();
        // 停止下拉动作  
        wx.stopPullDownRefresh();
      }
    })
  },
  onReachBottom: function () {
    // 显示顶部刷新图标  
    // 显示加载图标  
    wx.showLoading({
      title: '玩命加载中',
    }) 
    var that = this;
    var allMsg = that.data.sclist;
    page++;
    wx.request({
      url: app.globalData.apiUrl + 'api/test?page=' + page,
      method: "GET",
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // 不能直接 allMsg.push(res); 相当于list.push(list);打乱了结构  
        for (var i = 0; i < res.data.xcxsucai.length; i++) {
          allMsg.push(res.data.xcxsucai[i]);
          console.log(res.data.xcxsucai[i].Id);
        }
        that.setData({
          sclist: allMsg
        });

        // that.setData({
        //   moment: res.data.data
        //  });
        // 设置数组元素  
        // that.setData({
        //    moment: that.data.moment
        //  });
        // console.log(that.data.moment);
        // 隐藏加载框  
        wx.hideLoading(); 
      }
    })
  }
})
