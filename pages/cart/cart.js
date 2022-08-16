// pages/cart/cart.js
import Storage from '../../utils/storage'
Page({
  //商品数量jia
  handleCrement(event){
    // console.log('jia')
    // console.log('event',event)
    const _index=event.currentTarget.dataset.index
    console.log('_index',_index)
    this.data.cartList[_index].num+=1
    this.setData({
      cartList:this.data.cartList
    })
    Storage.set('carts',this.data.cartList)
  },
  // 商品数量-
  handleDrement(event){
    const _index=event.currentTarget.dataset.index
    console.log('_index',_index)
    this.data.cartList[_index].num-=1
    this.setData({
      cartList:this.data.cartList
    })
    Storage.set('carts',this.data.cartList)
  },

  handleComputedCount(event,action){
    const _index=event.currentTarget.dataset.index
    action=='increment'?this.data.cartList[_index].num-=1:this.data.cartList[_index].num+=1
    if(this.data.cartList[_index].num<=0){
      this.data.cartList[_index].num=1
      this.handleModalAction(_index)
    }
    this.setData({
      cartList:this.data.cartList
    })
    Storage.set('carts',this.data.cartList)
  },
  handleModalAction(index){
    wx.showModal({
      title: '提示',
      content: '您确定要删除此商品吗?',
      success :(res) =>{
        if (res.confirm) {
          this.data.cartList.splice(index,1)
          this.setData({
            cartList : this.data.cartList
          })
          Storage.set("carts", this.data.cartList)
          this.handleComputedPrice()
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })    
  },
  /**
   * 页面的初始数据
   */
  data: {
    cartList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getCartList()
  },
  getCartList(){
    const cartList=Storage.get('carts')
    // console.log('cartList',cartList)
    if(cartList.length<0) return 
    this.setData({
      cartList
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
  / */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})