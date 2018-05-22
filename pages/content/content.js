Page({
  data:{
    id:'',
    userlist:[],
    teacher:''
  },
  onLoad: function (option) {
    this.setData({
      id: option.id,
    });
    console.log(option.id);
    var that = this//不要漏了这句，很重要
    wx.request({
      url: 'http://hanbashuoshuo.zzd123.com/test/test',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //将获取到的json数据，存在名字叫zhihu的这个数组中
        that.setData({
          userlist: res.data.testname,
          teacher: res.data.testname[0].TeacherInfo
          //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories

        })
      }
    });
    console.log("用id获取对象，并赋值给相应的字段名");
  }
})