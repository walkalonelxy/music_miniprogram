// pages/index/index.js
import request from '../../service/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [], // 轮播图列表
    recommendList: [], // 推荐歌单列表
    topList: [] // 排行榜
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // 获取轮播图数据
    let bannerData = await request({ url: '/banner', data: { type: 2 } });
    this.setData({
      bannerList: bannerData.banners
    })
    
    // 获取推荐歌单数据
    let recommendData = await request({ url: '/personalized', data: { limit: 10 } })
    this.setData({
      recommendList: recommendData.result
    })
    
    // 获取排行榜数据
    let index = 0;
    let resultArr = [];
    while (index < 5){
      let topListData = await request({ url: '/top/list', data: { idx: index++ } });
      // splice(会修改原数组，可以对指定的数组进行增删改) slice(不会修改原数组)
      let topListItem = {name: topListData.playlist.name, tracks: topListData.playlist.tracks.slice(0, 3)};
      resultArr.push(topListItem);
      // 不需要等待五次请求全部结束才更新，用户体验较好，但是渲染次数会多一些
      this.setData({
        topList: resultArr
      })
    }
    
  },

  // 跳转每日推荐页面
  toRecommendSong() {
    wx.navigateTo({ url: '/pages/recommendSong/recommendSong' })
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