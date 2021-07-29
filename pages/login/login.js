import request from '../../service/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '', // 手机号
    password: '' // 用户密码
  },

  // 表单项内容发生改变的回调
  handleInput(event){
    let type = event.currentTarget.id;// id传值 取值： phone || password
    this.setData({
      [type]: event.detail.value
    })
  },

  async login() {
    let {phone, password} = this.data;
    if(!phone){
      // 提示用户
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none'
      })
      return;
    }
    let phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/;
    if(!phoneReg.test(phone)){
      wx.showToast({
        title: '手机号格式错误',
        icon: 'none'
      })
      return;
    }

    if(!password){
      wx.showToast({
        title: '密码不能为空',
        icon: 'none'
      })
      return;
    }

    // 调用网易云音乐登录接口，登录需要真实的网易云音乐账号.15711140593,123456yzy
    let res = await request({url: '/login/cellphone', data: {phone, password, isLogin: true}});
    if(res.code === 200){ // 登录成功
      wx.showToast({
        title: '登录成功'
      })

      // 将用户的信息存储至本地
      wx.setStorageSync('userInfo', JSON.stringify(res.profile))
      
      // 跳转至个人中心personal页面
      wx.reLaunch({
        url: '/pages/personal/personal'
      })
    } else {
      wx.showToast({
        title: res.msg,
        icon: 'none'
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})