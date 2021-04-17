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
        this.setData({
          triets: response, loading: false,
          owner_name: "Triet"
          });
      },
      fail: (fail) => {
        console.log('Fail', fail);
      }
    });
  },
  onPageAcceptRequest(product) {
    this.setData({
      show: true,
      popup_text_1: 'Bạn có muốn chọn sách này?',
      popup_text_2: '(Triết sẽ nhận sách của bạn để đổi với quyển này)'
      })
  },
  onRequestConfirm() {
    this.setData({
      show: false,
      showFinishPopup: true,
      popup_text_1: 'Trao đổi sách thành công. Mã giao dịch: 12',
      popup_text_2: 'Triết sẽ nhận Ông già và biển cả và đưa bạn sách Harry Potter',
      popup_text_3: 'SĐT của Triết: 0985494839',
      popup_text_4: 'Vui lòng lưu lại thông tin này bằng screenshot'
    })  
  },
  onCancel() {
    this.setData({ show: false, showFinishPopup: false })    
  },
});