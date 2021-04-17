Page({
  onReady() {
  },
  onShow() {
  },
  onHide() {
  },
  onUnload() {
  },
  onLoad(query) {
    my.request({
      url: 'https://api.tala.xyz/shopping/v1/mini-app/all-shareable-books/',
      method: 'GET',
      success: (response) => {
        console.log('Product Reponse: ', response)
        this.setData({ triets: response, loading: false });
      },
      fail: (fail) => {
        console.log('Fail', fail);
      }
    });

    // my.navigateTo({ url: `pages/your-lib/index` });
  },
  goMyBook() {
    my.navigateTo({url: `pages/mybook/index`});
  },
  onPageSendRequest(product) {
    // app.onAppSendRequest(product);

    this.setData({
      show: true,
      popup_text_1: 'Bạn có muốn gửi yêu cầu trao đổi sách?',
      popup_text_2: '(Triết sẽ chọn đổi với 1 quyển trong thư viện của bạn)'
      })
  },
  onCancel() {
    this.setData({ show: false })    
  },
  onSendConfirm() {
    // Show toast
    my.showToast({
      type: 'success',
      content: 'Đã gửi yêu cầu trao đổi sách',
      buttonText: 'OK',
      duration: 2000,
    });
    this.setData({ show: false })    
  },
  onPageAcceptRequest(product) {
    app.onAppAcceptRequest(product);

    // Show toast
    my.showToast({
      type: 'success',
      content: 'Sản phẩm đã được thêm vào giỏ hàng',
      buttonText: 'OK',
      duration: 3000,
    });
  }
});