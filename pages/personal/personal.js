import request from '../../service/request'
let startY = 0; // 手指点击屏幕时的纵向坐标
let moveY = 0; // 手指移动结束时的纵向坐标
let moveDistanceY = 0; // 结束时的纵向坐标减去手指点击屏幕时的坐标等于y方向移动的距离
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coverTransform: 'translateY(0)', // 设置transform
    transition: '', // 设置过度效果
    userInfo: {},
    recentPlayList: [], // 用户播放记录
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({
        userInfo: JSON.parse(userInfo)
      })
      this.getUserRecentPlayList(this.data.userInfo.userId);
    }
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

  },

  // 获取用户播放记录的功能函数
  async getUserRecentPlayList(userId){
    let recentPlayListData = await request({ url: '/user/record', data: {uid: userId, type: 0} });
    let index = 1;
    let recentPlayList = recentPlayListData.allData.splice(0, 10).map(item => {
      item.id = index++;
      return item;
    })
    console.log('recentPlayList', recentPlayList);
    
    this.setData({
      recentPlayList
    })
  },

  // 手指点击屏幕时触发
  handleTouchStart(event) {
    this.setData({
      transition: ''
    })
    startY = event.touches[0].clientY; // touches是数组，因为可能是多个手指点击，此处取最先点击屏幕的手指的y坐标作为起始坐标
  },

  // 手指滑动时触发
  handleTouchMove(event) {
    moveY = event.touches[0].clientY;
    moveDistanceY = moveY - startY;
    if (moveDistanceY <= 0) return;
    if (moveDistanceY > 80) moveDistanceY = 80;
    this.setData({
      coverTransform: `translateY(${moveDistanceY}rpx)`
    })
  },

  // 手指松开时触发
  handleTouchEnd(event) {
    this.setData({
      coverTransform: `translateY(0)`,
      transition: 'transform .3s linear'
    })
  },

  // 跳转登录
  toLogin() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  }
})